import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

import { OpenAPI as CoreOpenAPi } from '../../clients/Core';
import { entities } from '../../consts/entities';
import { SharedStateReturn, useSharedState } from '../state/useSharedState';

export const ACCOUNT_RESPONSE_KEY = 'AUTH_INFO';

export type ApiToken = Pick<AuthenticationResultType, 'AccessToken' | 'RefreshToken'> & {
	username: string;
};

export function useApiToken(): SharedStateReturn<null | ApiToken> {
	const [apiToken, setApiToken] = useSharedState<null | ApiToken>(
		entities.accessToken,
		getAccessToken(),
		setAccessToken,
	);

	if (apiToken) {
		CoreOpenAPi.TOKEN = apiToken.AccessToken;
	} else {
		delete CoreOpenAPi.TOKEN;
	}

	return [apiToken, setApiToken];
}

const getAccessToken = (): null | ApiToken => {
	const restored = localStorage.getItem(ACCOUNT_RESPONSE_KEY);
	return restored ? JSON.parse(restored) : null;
};

const setAccessToken = (token: null | ApiToken) => {
	localStorage.setItem(ACCOUNT_RESPONSE_KEY, JSON.stringify(token));
};
