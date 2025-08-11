'use client';

import { PropsWithChildren } from 'react';

export function Content({ children }: PropsWithChildren) {
  return <div className="flex-1 p-6">{children}</div>;
}
