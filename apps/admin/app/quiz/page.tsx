'use client';

import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '@/utils/translation-keys';

export default function Quiz() {
  const { t } = useTranslation();

  return (
    <h2 className="text-2xl font-bold tracking-tight">
      {t(TranslationKeys.quiz.title)}
    </h2>
  );
}
