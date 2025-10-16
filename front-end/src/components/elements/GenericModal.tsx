import {
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react';
import Draggable from 'react-draggable';
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps
} from '@mui/material';

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle=".draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds="parent"
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

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
      PaperComponent={PaperComponent}
    // onClose={onClose}
    >
      <DialogTitle
        style={{ cursor: 'move' }}
        className='draggable-dialog-title'
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

