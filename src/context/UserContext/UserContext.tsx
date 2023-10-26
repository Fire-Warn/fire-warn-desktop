import { createContext, PropsWithChildren, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';

import { UserResponse, UserService } from '../../clients/Core';
import { useApiToken } from '../../hooks/auth';
import { entities } from '../../consts/entities';
import { useSnackbarOnError } from '../../hooks/notistack';

export const UserContext = createContext<{ user?: UserResponse; isLoaded: boolean }>({
	isLoaded: false,
});

export const useRole = () => useContext(UserContext).user?.role;

export const useUser = () => useContext(UserContext).user;

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [apiToken] = useApiToken();
	const [isLoaded, setIsLoaded] = useState(!apiToken);
	const { data: user, isLoading } = useQuery(
		[entities.contextUser, apiToken],
		UserService.getCurrent,
		{
			enabled: !!apiToken,
			onError: useSnackbarOnError(),
			onSettled: () => setIsLoaded(true),
		},
	);

	if (!user && isLoading) {
		return (
			<Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
				<CircularProgress size={'4rem'} />
			</Box>
		);
	}

	return <UserContext.Provider value={{ user, isLoaded }}>{children}</UserContext.Provider>;
};
