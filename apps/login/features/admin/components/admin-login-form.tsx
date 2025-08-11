'use client';

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
import { DUMMY_USERS_RECORD, dummyToken } from '@shared/lib/dummy-data';
import { User, UserInputs, UserRole, userSchema } from '@shared/types/user';

import { TranslationKeys } from '@/utils/translation-keys';

export function AdminLoginForm() {
  const { t } = useTranslation();
  const [_cookies, setCookie] = useCookies([dummyToken]);
  const form = useZodForm({
    schema: userSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserInputs> = async (data: UserInputs) => {
    const users = JSON.parse(localStorage.getItem(DUMMY_USERS_RECORD) || '[]');
    const existingUser = users.find(
      (user: User) => user.email === data.email && user.role === UserRole.Admin
    );
    if (existingUser) {
      setCookie(dummyToken, existingUser.token);
    } else {
      form.setError('email', {
        message: 'User not found or incorrect password',
      });
      form.setError('password', {
        message: 'User not found or incorrect password',
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
                  autoComplete="new-password"
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
