import { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
	AuthFlowType,
	CognitoIdentityProvider,
	InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

import { WTextField, AuthForm } from './Login.styles';
import { useApiToken } from '../../hooks/auth';
import { hashCognitoSecret } from '../../shared';
import { useSnackbarOnError } from '../../hooks/notistack';
import { appPaths } from '../../app.routes';

function Login() {
	const { t } = useTranslation('login');
	const navigate = useNavigate();
	const region: string = window.env.COGNITO_REGION || '';
	const clientId: string = window.env.COGNITO_CLIENT_ID || '';
	const clientSecret: string = window.env.COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [, setApiToken] = useApiToken();

	const { mutate: signIn, isLoading } = useMutation(
		() => {
			const params = {
				ClientId: clientId,
				AuthFlow: 'USER_PASSWORD_AUTH' as AuthFlowType,
				AuthParameters: {
					USERNAME: email,
					PASSWORD: password,
					SECRET_HASH: hashCognitoSecret(clientSecret, email, clientId),
				},
			};

			return provider.initiateAuth(params);
		},
		{
			onSuccess: async (res: InitiateAuthCommandOutput) => {
				if (res.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
					navigate(
						generatePath(`/${appPaths.auth.url}/:child`, {
							child: appPaths.auth.children.setPassword,
						}),
						{
							state: { email, session: res.Session },
						},
					);
				} else {
					setApiToken({
						AccessToken: res.AuthenticationResult?.AccessToken,
						RefreshToken: res.AuthenticationResult?.RefreshToken,
						username: email,
					});
					return navigate('/');
				}
			},
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			<Typography variant={'h3'} align={'center'}>
				{t('title')}
			</Typography>
			<AuthForm>
				<WTextField
					required
					label={t('labels.email')}
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				/>
				<WTextField
					required
					type={'password'}
					label={t('labels.password')}
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				/>
				<Button fullWidth disabled={isLoading} variant={'outlined'} onClick={() => signIn()}>
					{t('signIn')}
				</Button>
			</AuthForm>
		</>
	);
}

export default Login;
