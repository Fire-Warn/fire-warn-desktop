import { Outlet } from 'react-router-dom';
import { ComponentProps, useState } from 'react';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AppHeader } from '../AppHeader';
import { useLogout } from '../../hooks/auth';

import {
	Content,
	ChildrenWrapper,
	Container,
	ContentLarge,
	ChildrenWrapperLarge,
} from './AppWrapper.styles';

type AuthContainerProps = Record<string, never> & Omit<ComponentProps<'div'>, 'ref'>;

const AppWrapper = ({ ...rest }: AuthContainerProps) => {
	const theme = useTheme();
	const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const logout = useLogout();

	const handleCloseSidebar = () => {
		if (sidebarOpen) {
			setSidebarOpen(false);
		}
	};

	return (
		<>
			{isLarge ? (
				<Container>
					<AppHeader hideNavigation hideUser />
					<ContentLarge>
						<ChildrenWrapperLarge style={{ gridArea: 'children' }}>
							<Outlet {...rest} />
						</ChildrenWrapperLarge>
					</ContentLarge>
				</Container>
			) : (
				<Container>
					<AppHeader hideNavigation hideUser />
					<Content>
						<Drawer variant='temporary' open={sidebarOpen} onClose={handleCloseSidebar}>
							{/*<AppSidebar setSidebarOpen={setSidebarOpen} />*/}
							<Divider />
							<Button onClick={() => logout()}>Logout</Button>
						</Drawer>

						<ChildrenWrapper onMouseDown={handleCloseSidebar}>
							<Outlet {...rest} />
						</ChildrenWrapper>
					</Content>
				</Container>
			)}
		</>
	);
};

export default AppWrapper;
