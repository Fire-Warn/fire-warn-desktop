import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export const PagesMenu = styled(Menu).attrs({
	anchorOrigin: {
		vertical: 'bottom',
		horizontal: 'left',
	},
	keepMounted: true,
	transformOrigin: {
		vertical: 'top',
		horizontal: 'left',
	},
	sx: {
		display: { xs: 'block', md: 'none' },
	},
})``;

export const SettingsMenu = styled(Menu).attrs({
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'right',
	},
	keepMounted: true,
	transformOrigin: {
		vertical: 'top',
		horizontal: 'right',
	},
})`
	margin-top: 3rem;
`;

export const WToolbar = styled(Toolbar)`
	gap: 0.5rem;

	.logo-image {
		height: 2.5rem;
		width: 2.5rem;
	}
`;

export const PageButton = styled(Button)`
	color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const PagesWrapper = styled(Box).attrs({
	flexGrow: 1,
	display: { xs: 'none', md: 'flex' },
})``;

export const MobilePagesWrapper = styled(Box).attrs({
	display: { xs: 'flex', md: 'none' },
})``;

export const LogoWrapper = styled(Box).attrs({
	display: { xs: 'none', md: 'flex' },
})``;

export const MobileLogoWrapper = styled(Box).attrs({
	flexGrow: 1,
	display: { xs: 'flex', md: 'none' },
	justifyContent: 'center',
})``;

export const LogoTypography = styled(Typography)`
	color: ${({ theme }) => theme.palette.primary.contrastText};
	text-transform: uppercase;
	letter-spacing: 0.3rem;
	font-weight: 700;
`;

export const LogoBlock = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const AvatarButton = styled(IconButton)`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	border-radius: 0;

	.name {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		color: ${({ theme }) => theme.palette.primary.contrastText};

		@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
			display: none;
		}
	}
`;
