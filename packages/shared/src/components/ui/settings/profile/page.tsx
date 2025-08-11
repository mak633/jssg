import { Separator } from '@shared/components/primitives/separator';

import UserInformation from './user-information';

export function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          View your profile information and update your avatar.
        </p>
      </div>
      <Separator />
      <UserInformation />
    </div>
  );
}
