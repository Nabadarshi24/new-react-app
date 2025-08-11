import { ReactElement, useEffect, useState } from 'react';
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

export type TypeGenericModalProps = {
  title: string;
  content: ReactElement;
  openModal: boolean;
  onClose?: () => void;
  size?: Breakpoint;
};

export const GenericModal = ({
  title,
  content,
  openModal,
  onClose,
  size = "sm"
}: TypeGenericModalProps) => {

  console.log({ openModal })

  const [open, setOpen] = useState(openModal);
  // const [maxWidth, setmaxWidth] = useState(size);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  console.log({ open })

  return (
    <Dialog
      fullWidth={true}
      maxWidth={size}
      open={open}
    // onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

