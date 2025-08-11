import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomError } from '@/components/custom-error';
import { LoginOptions } from '@/features/login/components/login-options';
import { TranslationKeys } from '@/utils/translation-keys';

export function Login() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center">
      <div className="mb-4 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t(TranslationKeys.login.title)}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t(TranslationKeys.login.subtitle)}
        </p>
      </div>
      <div className="grid w-full gap-6">
        <LoginOptions />
      </div>
      <Suspense>
        <CustomError message={t(TranslationKeys.common.error)} />
      </Suspense>
    </div>
  );
}
