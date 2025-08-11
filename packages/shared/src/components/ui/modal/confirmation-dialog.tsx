import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@shared/components/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@shared/components/primitives/dialog';

const dialogVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: 'bg-red-500 hover:bg-red-500/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface Props extends VariantProps<typeof dialogVariants> {
  title: string;
  text: string;
  message?: string;
  acceptText: string;
  cancelText: string;
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
  children?: React.ReactNode;
}

export const ConfirmationDialog = ({
  title,
  text,
  message,
  acceptText,
  cancelText,
  open,
  onCancel,
  onAccept,
  variant,
  children,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children && <div className="mt-4">{children}</div>}
          <DialogDescription>
            <span className="font-bold text-gray-500">{text}</span>{' '}
            <span className="text-gray-500">{message}</span>
          </DialogDescription>
          <DialogFooter>
            <Button className="mr-2" variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button className={dialogVariants({ variant })} onClick={onAccept}>
              {acceptText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
