import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input';

export const WTextField = styled(TextField).attrs({
	fullWidth: true,
	variant: 'outlined',
})`
	min-width: 25rem;
`;

export const WPhoneInput = styled(MuiTelInput)`
	width: 100%;
`;
