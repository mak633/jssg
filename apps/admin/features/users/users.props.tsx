import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { User } from '@shared/types/user';

import { TranslationKeys } from '@/utils/translation-keys';

const columnHelper = createColumnHelper<User>();

const columns = (t: TFunction<'translation', string>) => [
  columnHelper.accessor('id', {
    header: t(TranslationKeys.user.id),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('email', {
    header: t(TranslationKeys.user.email),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('firstName', {
    header: t(TranslationKeys.user.first_name),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('lastName', {
    header: t(TranslationKeys.user.last_name),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('role', {
    header: t(TranslationKeys.user.role),
    enableSorting: false,
    enableHiding: false,
  }),
];

export default columns;
