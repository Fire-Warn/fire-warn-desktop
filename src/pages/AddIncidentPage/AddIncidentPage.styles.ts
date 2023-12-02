import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const WTextField = styled(TextField).attrs({
  fullWidth: true,
  variant: 'outlined',
})`
  min-width: 25rem;
`;
