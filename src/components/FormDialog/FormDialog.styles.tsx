import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

export const WDialogTitle = styled(DialogTitle).attrs({
  color: 'textPrimary',
  variant: 'h4',
})`
  padding-top: 1rem;
`;

export const Description = styled(Typography).attrs({
  color: 'textSecondary',
})``;

export const WDialogContent = styled(DialogContent)`
  > * {
    margin-top: 1rem;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 1rem 1rem 1rem;
  gap: 1rem;
`;

export const WLinearProgress = styled(LinearProgress)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;
