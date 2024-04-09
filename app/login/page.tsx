import Link from 'next/link';
import { ROUTE_PATHS } from '../_constants/route';

export default function LoginPage() {
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
          />
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
