'use client';

import Image from 'next/image';

import { useIsMobile } from '@shared/hooks/use-mobile';

export function HeaderLogo() {
  const isMobile = useIsMobile();

  return (
    <div className="-z-1 absolute top-3 flex w-full items-center justify-center lg:top-6">
      <Image
        src="https://wealth.jsafrasarasin.com/public/assets/bjss/assets/images/bjss-theme-logo.svg"
        alt="J. Safra Sarasin logo"
        width={isMobile ? 100 : 200}
        height={isMobile ? 50 : 100}
      />
    </div>
  );
}
