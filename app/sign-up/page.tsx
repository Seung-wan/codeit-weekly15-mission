'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ROUTE_PATHS } from '../_constants/route';
import { REGEX } from '../_constants/regex';
import { useState } from 'react';
import AccessTokenChecker from '../_components/access-token-checker';

interface FieldValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpPage() {
  const { push } = useRouter();

  const {
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  const [passwordType, setPasswordType] = useState('text');

  const handleClickTogglePasswordType = () => {
    setPasswordType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const onSubmit = async () => {
    try {
      // // 이메일 중복 확인 api라고 가정
      // const result = await new Promise((_, reject) => {
      //   setTimeout(() => {
      //     reject(new Error('이미 존재하는 계정입니다.'));
      //   }, 1000);
      // });

      // 회훤가입 api라고 가정
      const result = (await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: '성공',
            accessToken: 'token',
          });
        }, 1000);
      })) as { status: string; accessToken: string };

      if (result.status === '성공') {
        localStorage.setItem('access-token', result.accessToken);
        push(ROUTE_PATHS.FOLDER);
      }
    } catch (error) {
      setError('email', {
        message: '다른 이메일을 입력해주세요. (회원가입 실패시 에러메시지)',
      });
    }
  };

  return (
    <AccessTokenChecker>
      <div className="w-[400px] mx-auto pt-[238px]">
        <div>
          <div>Linkbrary 아이콘</div>
          <div className="flex gap-2 mt-4">
            회원이 아니신가요?
            <Link href={ROUTE_PATHS.LOGIN}>로그인 하기</Link>
          </div>
        </div>

        {/* form의 onSubmit 이벤트, button의 submit 타입을 활용했기 때문에 엔터키 + 버튼 클릭으로 폼이 제출됩니다. */}
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              className="border h-8 p-4"
              placeholder="이메일을 입력해 주세요."
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: REGEX.EMAIL,
                  message: '올바른 이메일 주소가 아닙니다.',
                },
              })}
            />
            {errors.email?.message && (
              <div className="text-red-800">{errors.email?.message}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호</label>
            <div className="relative">
              <input
                id="password"
                type={passwordType}
                className="border h-8 p-4 w-full"
                placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message:
                      '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
                  },
                  validate: {
                    hasNumbers: (value) =>
                      !REGEX.ONLY_NUMBER.test(value) ||
                      '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
                    hasStrings: (value) =>
                      !REGEX.ONLY_STRING.test(value) ||
                      '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
                  },
                })}
              />
              <div
                onClick={handleClickTogglePasswordType}
                className="absolute top-1/2 right-4 -translate-y-1/2"
              >
                {passwordType === 'text' ? '사선이 없는 눈' : '사선 있는 눈'}
              </div>
            </div>

            {errors.password?.message && (
              <div className="text-red-800">{errors.password?.message}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              id="password"
              className="border h-8 p-4"
              placeholder="비밀번호와 일치하는 값을 입력해 주세요."
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: {
                  passwordAndPasswordConfirmDifferent: (value) => {
                    const formValues = getValues();

                    if (value !== formValues.password) {
                      return '비밀번호가 일치하지 않아요.';
                    }
                  },
                },
              })}
            />
            {errors.passwordConfirm?.message && (
              <div className="text-red-800">
                {errors.passwordConfirm?.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="text-center border p-2 mt-4 bg-black text-white w-full"
          >
            로그인
          </button>
        </form>

        <div className="flex justify-between mt-4">
          <div>소셜 로그인</div>
          <div className="flex gap-2">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              구글 아이콘
            </a>
            <a
              href="https://www.kakaocorp.com/page"
              target="_blank"
              rel="noreferrer noopener"
            >
              카카오톡 아이콘
            </a>
          </div>
        </div>
      </div>
    </AccessTokenChecker>
  );
}
