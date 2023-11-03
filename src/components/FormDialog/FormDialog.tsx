import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { FormDialogProps } from '.';

import {
  WDialogContent,
  WLinearProgress,
  WDialogTitle,
  Description,
  DialogActions,
} from './FormDialog.styles';

function FormDialog({
  title,
  description,
  reportId,
  cancelText,
  acceptText,
  submittedCb,
  confirmDisabled,
  confirmText,
  buttonsFullwidth = true,
  onClose,
  children,
  ...rest
}: FormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [rest.open, setIsLoading]);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await submittedCb();
      onClose();
    } catch (error) {
      // to get rid of "unhandled error rejection" thing
      console.error('Dialog error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={false} onClose={() => onClose()} {...rest}>
      {title && <WDialogTitle>{title}</WDialogTitle>}
      {description && (
        <DialogTitle>
          <Description>{description}</Description>
        </DialogTitle>
      )}
      <WDialogContent>{children}</WDialogContent>
      <DialogActions>
        <Button
          variant={'outlined'}
          color={'inherit'}
          fullWidth={buttonsFullwidth}
          onClick={() => onClose()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
          fullWidth={buttonsFullwidth}
          onClick={onConfirm}
          disabled={isLoading || confirmDisabled}
        >
          {acceptText}
        </Button>
      </DialogActions>
      {isLoading && <WLinearProgress />}
    </Dialog>
  );
}

export default FormDialog;
