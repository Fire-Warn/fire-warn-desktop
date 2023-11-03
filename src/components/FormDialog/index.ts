import React, { Dispatch } from 'react';
import { DialogProps } from '@mui/material/Dialog';

import FormDialog from './FormDialog';

export default FormDialog;

export type FormDialogProps = Omit<Partial<DialogProps>, 'onClose'> & {
  reportId?: string;
  title?: string;
  description?: string;
  acceptText: string;
  cancelText?: string;
  confirmDisabled?: boolean;
  confirmText?: string;
  onClose: Dispatch<void>;
  submittedCb: () => Promise<void | any>;
  children: React.ReactNode;
  buttonsFullwidth?: boolean;
};
