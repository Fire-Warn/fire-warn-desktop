import { useEffect, useMemo } from 'react';
import { AuthFlowType, CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { useApiToken, ApiToken, useLogout } from '../auth';
import { hashCognitoSecret } from '../../shared';

export function useAutoTokenRefresh() {
	const region: string = window.env.COGNITO_REGION || '';
	const clientId: string = window.env.COGNITO_CLIENT_ID || '';
	const clientSecret: string = window.env.COGNITO_CLIENT_SECRET || '';

	const provider = useMemo(() => new CognitoIdentityProvider({ region }), [region]);

	const [apiToken, setApiToken] = useApiToken();
	const logout = useLogout();

	useEffect(() => {
		const originalFetch = global.fetch;
		global.fetch = async (input: string, config?: RequestInit): Promise<Response> => {
			const response = await originalFetch(input, config);

			let newAuthToken: ApiToken | null = null;

			const UNAUTHORIZED_STATUS_CODE = 401;
			if (response.status === UNAUTHORIZED_STATUS_CODE) {
				if (!apiToken?.RefreshToken) {
					logout();
					return response;
				}

				const params = {
					ClientId: clientId,
					AuthFlow: 'REFRESH_TOKEN_AUTH' as AuthFlowType,
					AuthParameters: {
						REFRESH_TOKEN: apiToken.RefreshToken,
						SECRET_HASH: hashCognitoSecret(clientSecret, apiToken.username, clientId),
					},
				};

				try {
					const res = await provider.initiateAuth(params);
					newAuthToken = {
						AccessToken: res.AuthenticationResult?.AccessToken,
						RefreshToken: apiToken.RefreshToken,
						username: apiToken.username,
					};
					setApiToken(newAuthToken);
				} catch (e) {
					console.log('token refresh error', e);
					logout();
				}

				if (newAuthToken) {
					const newHeaders = new Headers(config?.headers);

					newHeaders.set('Content-Type', 'application/json');

					newHeaders.set('Authorization', `Bearer ${newAuthToken.AccessToken}`);

					return originalFetch(input, {
						...config,
						headers: newHeaders,
					});
				}
			}

			return response;
		};

		return () => {
			global.fetch = originalFetch;
		};
	}, [apiToken, setApiToken, logout, clientId, provider, clientSecret]);
}
