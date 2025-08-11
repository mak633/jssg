import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '@/utils/translation-keys';

export function TermsOfUse() {
  const { t } = useTranslation();

  return (
    <Link
      href="https://jsafrasarasin.com/content/jsafrasarasin/language-masters/en/home/legal/eservices-legal-disclaimer-pre-login/en.html"
      className="mb-8 font-semibold text-white"
    >
      {t(TranslationKeys.app.terms_of_use)}
    </Link>
  );
}
