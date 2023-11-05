import { Outlet } from 'react-router-dom';
import { ComponentProps } from 'react';

import { AppHeader } from '../AppHeader';

import { Container, ContentLarge, ChildrenWrapperLarge } from './AppWrapper.styles';

type AuthContainerProps = Record<string, never> & Omit<ComponentProps<'div'>, 'ref'>;

const AppWrapper = ({ ...rest }: AuthContainerProps) => {
	return (
		<Container>
			<AppHeader />
			<ContentLarge>
				<ChildrenWrapperLarge style={{ gridArea: 'children' }}>
					<Outlet {...rest} />
				</ChildrenWrapperLarge>
			</ContentLarge>
		</Container>
	);
};

export default AppWrapper;
