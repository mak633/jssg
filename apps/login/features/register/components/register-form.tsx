import { redirect } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from '@shared/components/primitives/form';
import { Input } from '@shared/components/primitives/input';
import { useZodForm } from '@shared/hooks/use-zod-form';
import { DUMMY_USERS_RECORD } from '@shared/lib/dummy-data';
import { User, UserInputs, UserRole, userSchema } from '@shared/types/user';

import { TranslationKeys } from '@/utils/translation-keys';

export function RegisterForm() {
  const { t } = useTranslation();
  const form = useZodForm({
    schema: userSchema,
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit: SubmitHandler<UserInputs> = async (data: UserInputs) => {
    const users = JSON.parse(localStorage.getItem(DUMMY_USERS_RECORD) || '[]');
    const newUser: User = {
      ...data,
      id: String(users.length + 1),
      role: UserRole.User,
      token: `dummyUserJWT-${users.length + 1}`,
    };
    localStorage.setItem(
      DUMMY_USERS_RECORD,
      JSON.stringify([...users, newUser])
    );
    redirect('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t(TranslationKeys.registration.first_name)}
              </FormLabel>
              <FormControl>
                <Input placeholder="John" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(TranslationKeys.registration.last_name)}</FormLabel>
              <FormControl>
                <Input placeholder="Doe" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {t(TranslationKeys.registration.sign_up)}
        </FormSubmitButton>
      </form>
    </Form>
  );
}
