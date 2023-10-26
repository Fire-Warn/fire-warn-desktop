import { DialogProps } from '@mui/material/Dialog';

export { default as ConfirmDialog } from './ConfirmDialog';

export * from './ConfirmDialog.context';

export type ConfirmDialogProps = {} & Partial<DialogProps>;
