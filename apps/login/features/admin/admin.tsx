import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomError } from '@/components/custom-error';
import { TranslationKeys } from '@/utils/translation-keys';

import { AdminLoginForm } from './components/admin-login-form';

export function Admin() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t(TranslationKeys.login.title)}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t(TranslationKeys.login.subtitle)}
        </p>
      </div>
      <div className="grid w-full gap-6">
        <AdminLoginForm />
      </div>
      <Suspense>
        <CustomError message={t(TranslationKeys.common.error)} />
      </Suspense>
    </div>
  );
}
