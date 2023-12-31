import { useState, ChangeEvent } from 'react';
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
	const navigate = useNavigate();
	const region: string = process.env.COGNITO_REGION || '';
	const clientId: string = process.env.COGNITO_CLIENT_ID || '';
	const clientSecret: string = process.env.COGNITO_CLIENT_SECRET || '';
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
				Sign In
			</Typography>
			<AuthForm>
				<WTextField
					required
					label={'Email'}
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				/>
				<WTextField
					required
					type={'password'}
					label={'Password'}
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				/>
				<Button fullWidth disabled={isLoading} variant={'outlined'} onClick={() => signIn()}>
					Sign In
				</Button>
			</AuthForm>
		</>
	);
}

export default Login;
