import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export const WTitle = styled(Typography)`
	&:not(.no-padding) {
		padding-right: 2rem;
	}
`;

export const WSubtitle = styled(Typography).attrs({
	variant: 'h6',
})`
	margin-top: 0.5rem;
`;

export const WDescription = styled(Typography)`
	margin-top: 1rem;
`;

export const WTextField = styled(TextField)`
	min-width: min(30rem, 60vw);
	margin: 1rem 0 3rem;
`;

export const CenteredContent = styled.div`
	padding: 0.5rem;
	min-width: 550px;
	text-align: center;
	> *:not(:first-child) {
		margin-top: 1rem;
	}
`;

export const WDialog = styled(Dialog)`
	display: block;

	.MuiPaper-root {
		padding: 1.5rem !important;
	}
`;

export const CloseIconButton = styled(IconButton)`
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	display: block;
`;

export const RowContent = styled.div`
	display: flex;
	&.column {
		flex-direction: column;
		text-align: center;
	}

	margin: -0.5rem;
	> * {
		margin: 0.5rem;
	}

	.grow {
		flex-grow: 1;
	}

	.MuiDialogActions-root {
		margin-top: 1.5rem;
	}
`;
