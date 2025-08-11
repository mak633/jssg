'use client';

import Link from 'next/link';

import { buttonVariants } from '@shared/components/primitives/button';
import { cn } from '@shared/lib/utils';

import { RegisterForm } from './register-form';

export function RegisterOptions() {
  return (
    <>
      <RegisterForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or</span>
        </div>
      </div>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
      >
        Sign In
      </Link>
    </>
  );
}
