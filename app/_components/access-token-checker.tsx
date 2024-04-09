'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { ROUTE_PATHS } from '../_constants/route';

export default function AccessTokenChecker({ children }: PropsWithChildren) {
  const { push } = useRouter();

  const accessToken = localStorage.getItem('access-token') ?? '';

  if (accessToken) {
    push(ROUTE_PATHS.FOLDER);
  } else {
    return <div>{children}</div>;
  }
}
