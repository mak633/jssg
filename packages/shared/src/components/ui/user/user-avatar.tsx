import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/primitives/avatar';
import { User } from '@shared/types/user';

interface UserAvatarProps {
  user: User;
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatarProps) => {
  const imageUrl = null;

  if (imageUrl === null)
    return (
      <Avatar className={className}>
        <AvatarFallback>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </AvatarFallback>
      </Avatar>
    );

  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} alt="User Avatar" />
    </Avatar>
  );
};

export default UserAvatar;
