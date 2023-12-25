import * as React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { entities } from '../../consts/entities';
import { useRole } from '../../context/UserContext';
import { UserService } from '../../clients/Core';
import { useSnackbarOnError } from '../../hooks/notistack';
import { useApiToken, useLogout } from '../../hooks/auth';
import {
	WToolbar,
	PageButton,
	SettingsMenu,
	PagesWrapper,
	MobilePagesWrapper,
	LogoTypography,
	LogoBlock,
	LogoWrapper,
	MobileLogoWrapper,
	AvatarButton,
} from './AppHeader.styles';
import { appPaths } from '../../app.routes';

function AvatarPopover({ name }: { name: string }) {
	const { t } = useTranslation('components', { keyPrefix: 'avatarPopover' });
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const logout = useLogout();
	const settings: Array<{ name: string; onClick: () => any }> = [
		{
			name: t('settings.logout'),
			onClick: () => {
				setAnchorElUser(null);
				return logout();
			},
		},
	];

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<div>
			<Tooltip title='Open settings'>
				<AvatarButton onClick={handleOpenUserMenu}>
					<Typography className={'name'}>{name}</Typography>
					<Avatar />
				</AvatarButton>
			</Tooltip>
			<SettingsMenu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map(setting => (
					<MenuItem key={setting.name} onClick={setting.onClick}>
						<Typography textAlign='center'>{setting.name}</Typography>
					</MenuItem>
				))}
			</SettingsMenu>
		</div>
	);
}

function ReportPopover() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const role = useRole();

	const items: Array<{ name: string; onClick: () => any; hidden?: boolean }> = [
		{
			name: 'My Cars',
			onClick: () => navigate('temp-1'),
			hidden: true,
		},
		{
			name: 'Rental orders',
			onClick: () => navigate('temp-2'),
		},
	];

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<PageButton onClick={handleOpenMenu}>Reports</PageButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
				{items
					.filter(item => !item.hidden)
					.map(item => (
						<MenuItem key={item.name} onClick={item.onClick}>
							<Typography textAlign='center'>{item.name}</Typography>
						</MenuItem>
					))}
			</Menu>
		</>
	);
}

function Logo() {
	return (
		<Link to={'/'}>
			<LogoBlock>
				<LogoTypography>Fire Warn</LogoTypography>
			</LogoBlock>
		</Link>
	);
}

export default function AppHeader({
	hideUser,
	hideNavigation,
	openSidebar,
}: {
	hideUser?: boolean;
	hideNavigation?: boolean;
	openSidebar?: () => void;
}) {
	const { t } = useTranslation('components', { keyPrefix: 'appHeader' });
	const navigate = useNavigate();
	const role = useRole();
	const [apiToken] = useApiToken();

	const pages: Array<{ name: string; onClick: () => any; hidden?: boolean; Component?: React.FC }> =
		[
			{
				name: t('pages.users'),
				onClick: () => navigate(appPaths.users),
				hidden: !['Admin', 'RegionalAdmin', 'CommunityAdmin'].includes(role as string),
			},
			{ name: t('pages.incidents'), onClick: () => navigate(appPaths.incidents) },
			// { name: 'Reports', hidden: !role, onClick: () => {}, Component: ReportPopover },
		];

	const { data: me } = useQuery([entities.me], UserService.getCurrent, {
		onError: useSnackbarOnError(),
		enabled: !hideUser && !!apiToken,
	});

	return (
		<AppBar color={'primary'} position={'static'}>
			<Container maxWidth='xl'>
				<WToolbar>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>

					<MobilePagesWrapper>
						{!hideNavigation && (
							<IconButton size='large' onClick={openSidebar} color={'inherit'}>
								<MenuIcon />
							</IconButton>
						)}
					</MobilePagesWrapper>
					<MobileLogoWrapper>
						<Logo />
					</MobileLogoWrapper>

					{!hideNavigation && (
						<PagesWrapper>
							{pages
								.filter(page => !page.hidden)
								.map(page => {
									const Component = page.Component;
									return Component ? (
										<Component key={page.name} />
									) : (
										<PageButton key={page.name} onClick={page.onClick}>
											{page.name}
										</PageButton>
									);
								})}
						</PagesWrapper>
					)}

					{!hideUser && <AvatarPopover name={me ? `${me.firstName} ${me.lastName}` : ''} />}
				</WToolbar>
			</Container>
		</AppBar>
	);
}
