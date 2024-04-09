'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ROUTE_PATHS } from '../_constants/route';
import { REGEX } from '../_constants/regex';

interface FieldValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpPage() {
  const { push } = useRouter();

  const {
    formState: { errors },
    setError,
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    try {
      // const result = await new Promise((_, reject) => {
      //   setTimeout(() => {
      //     reject(new Error('실패'));
      //   }, 1000);
      // });

      const result = (await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: '성공',
          });
        }, 1000);
      })) as { status: string };

      if (result.status === '성공') {
        push(ROUTE_PATHS.FOLDER);
      }
    } catch (error) {
      setError('email', {
        message: '이메일을 확인해주세요. (로그인 실패시 에러메시지)',
      });
      setError('password', {
        message: '비밀번호를 확인해주세요. (로그인 실패시 에러메시지)',
      });
    }
  };

  return (
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
          <input
            id="password"
            className="border h-8 p-4"
            placeholder="비밀번호를 입력해 주세요."
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          {errors.password?.message && (
            <div className="text-red-800">{errors.password?.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호 확인</label>
          <input
            id="password"
            className="border h-8 p-4"
            placeholder="비밀번호 확인을 입력해 주세요."
            {...register('passwordConfirm', {
              required: '비밀번호 확인을 입력해주세요.',
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
          <div>구글 아이콘</div>
          <div>카카오톡 아이콘</div>
        </div>
      </div>
    </div>
  );
}
