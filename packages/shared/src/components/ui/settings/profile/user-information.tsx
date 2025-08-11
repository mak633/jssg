'use client';

import { User, Mail } from '@shared/components/icons';
import { Badge } from '@shared/components/primitives/badge';
import { Card, CardContent } from '@shared/components/primitives/card';
import UserAvatar from '@shared/components/ui/user-avatar/user-avatar';
import { useAuth } from '@shared/contexts/auth-context';

export default function UserInformation() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Card className="mx-auto w-full max-w-md overflow-hidden">
      <CardContent className="relative pt-0">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="group relative">
            <UserAvatar user={user} />
          </div>
        </div>
        <div className="mt-16 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <Badge variant="secondary" className="mt-2">
              God
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="size-5 text-gray-500" />
              <span className="text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="size-5 text-gray-500" />
              <span className="text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
