'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/primitives/table';

import { useGetUsers } from '@/infrastructure/hooks/use-get-users';
import { TranslationKeys } from '@/utils/translation-keys';

import columns from './users.props';

const Users = () => {
  const { data } = useGetUsers({ query: {} });
  const { t } = useTranslation();
  const table = useReactTable({
    data: data?.value ?? [],
    columns: columns(t),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        {t(TranslationKeys.user.title)}
      </h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
