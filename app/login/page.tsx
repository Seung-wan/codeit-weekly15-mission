'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { ROUTE_PATHS } from '../_constants/route';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface FieldValues {
  email: string;
  password: string;
}

// 이메일 input에서 focus out 할 때, 값이 없을 경우 아래에 “이메일을 입력해주세요.” 에러 메세지가 보이나요?

export default function LoginPage() {
  const {
    formState: { errors },
    register,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

  return (
    <div className="w-[400px] mx-auto pt-[238px]">
      <div>
        <div>Linkbrary 아이콘</div>
        <div className="flex gap-2 mt-4">
          회원이 아니신가요?
          <Link href={ROUTE_PATHS.SIGN_UP}>회원 가입하기</Link>
        </div>
      </div>

      <form className="mt-4">
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            className="border h-8 p-4"
            placeholder="이메일을 입력해 주세요."
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: EMAIL_REGEX,
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
          />
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
