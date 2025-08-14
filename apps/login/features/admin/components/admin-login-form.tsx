'use client';

import { redirect } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmitButton,
  Form,
} from '@shared/components/primitives/form';
import { Input } from '@shared/components/primitives/input';
import { useZodForm } from '@shared/hooks/use-zod-form';
import { dummyUsersRecord, dummyTokenPath } from '@shared/lib/dummy-data';
import { User, UserRole } from '@shared/types/user';

import { environment } from '@/environment';
import { LoginInputs, loginSchema } from '@/types/login';
import { TranslationKeys } from '@/utils/translation-keys';

export function AdminLoginForm() {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies();
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    const users = cookies[dummyUsersRecord] || '[]';
    const existingUser = users.find(
      (user: User) =>
        user.email === data.email &&
        user.password === data.password &&
        user.role === UserRole.Admin
    );
    if (existingUser) {
      setCookie(dummyTokenPath, existingUser.token);
      redirect(environment.ADMIN_UI_BASE_URL);
    } else {
      form.setError('email', {
        message: t(TranslationKeys.error.user_not_found),
      });
      form.setError('password', {
        message: t(TranslationKeys.error.user_not_found),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(TranslationKeys.common.email)}</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(TranslationKeys.common.password)}</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  type="password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton className="mt-6 w-full">
          {t(TranslationKeys.common.sign_in)}
        </FormSubmitButton>
      </form>
    </Form>
  );
}
