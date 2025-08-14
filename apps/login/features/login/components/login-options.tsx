import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { buttonVariants } from '@shared/components/primitives/button';
import { cn } from '@shared/lib/utils';

import { TranslationKeys } from '@/utils/translation-keys';

import { LoginForm } from './login-form';

export function LoginOptions() {
  const { t } = useTranslation();

  return (
    <>
      <LoginForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            {t(TranslationKeys.common.or)}
          </span>
        </div>
      </div>
      <Link
        href="/register"
        className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
      >
        {t(TranslationKeys.common.sign_up)}
      </Link>
    </>
  );
}
