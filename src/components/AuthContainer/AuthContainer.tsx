import { Outlet } from 'react-router-dom';
import { ComponentProps } from 'react';

import { LayoutContainer, FormContainer, Container } from './AuthContainer.styles';
import { AppHeader } from '../AppHeader';

type AuthContainerProps = {} & Omit<ComponentProps<'div'>, 'ref'>;

const AuthContainer = ({ ...rest }: AuthContainerProps) => (
	<Container>
		<AppHeader hideNavigation hideUser />
		<LayoutContainer>
			<FormContainer>
				<Outlet {...rest} />
			</FormContainer>
		</LayoutContainer>
	</Container>
);

export default AuthContainer;
