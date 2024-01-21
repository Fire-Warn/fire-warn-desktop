import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate, Location } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { WTextField } from '../Login/Login.styles';
import { useApiToken } from '../../hooks/auth';
import { useSnackbarOnError } from '../../hooks/notistack';
import { hashCognitoSecret } from '../../shared';

function SetPassword() {
	const navigate = useNavigate();
	const {
		state: { email, session },
	} = useLocation() as Location<{ email: string; session: string }>;

	const region: string = window.env.COGNITO_REGION || '';
	const clientId: string = window.env.COGNITO_CLIENT_ID || '';
	const clientSecret: string = window.env.COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [password, setPassword] = useState('');
	const [, setApiToken] = useApiToken();

	const { mutate: setCognitoPassword, isLoading } = useMutation(
		() => {
			const params = {
				ChallengeName: 'NEW_PASSWORD_REQUIRED',
				ClientId: clientId,
				ChallengeResponses: {
					USERNAME: email,
					NEW_PASSWORD: password,
					SECRET_HASH: hashCognitoSecret(clientSecret, email, clientId),
				},
				Session: session,
			};

			return provider.respondToAuthChallenge(params);
		},
		{
			onSuccess: async res => {
				setApiToken({
					AccessToken: res.AuthenticationResult?.AccessToken,
					RefreshToken: res.AuthenticationResult?.RefreshToken,
					username: email,
				});
				navigate('/');
			},
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			<Typography variant={'h3'} align={'center'} mb={5}>
				Set new password
			</Typography>
			<WTextField
				required
				type={'password'}
				label={'Password'}
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
			/>
			<Grid container justifyContent={'center'} mt={2}>
				<Button disabled={isLoading} variant={'outlined'} onClick={() => setCognitoPassword()}>
					Set Password
				</Button>
			</Grid>
		</>
	);
}

export default SetPassword;
