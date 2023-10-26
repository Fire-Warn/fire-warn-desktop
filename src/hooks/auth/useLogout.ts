import { useCallback } from 'react';

import { useApiToken } from './useApiToken';

export function useLogout() {
	const [, setApiToken] = useApiToken();
	return useCallback(() => {
		console.log('logout');
		setApiToken(null);
	}, [setApiToken]);
}
