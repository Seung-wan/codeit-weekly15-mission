import Link from 'next/link';

import { ROUTE_PATHS } from './_constants/route';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="font-bold text-2xl">메인 페이지입니다!!!!</h1>

      <Link className="border p-3" href={ROUTE_PATHS.LOGIN}>
        로그인하러가기
      </Link>
      <Link className="border p-3" href={ROUTE_PATHS.SIGN_UP}>
        회원가입하러가기
      </Link>
    </div>
  );
}
