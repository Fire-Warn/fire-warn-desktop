import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { IncidentService } from '../../clients/Core';
import { entities } from '../../consts/entities';
import { appPaths } from '../../app.routes';

function AddIncidentPage() {
	const { t } = useTranslation('addIncidentPage');
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');

	const { mutate: createIncident, isLoading: isCreateIncidentLoading } = useMutation(
		() =>
			IncidentService.createIncident({
				address,
				description,
			}),
		{
			onSuccess: () =>
				queryClient
					.invalidateQueries(entities.incidentsList)
					.then(() => navigate(`/${appPaths.incidents}`)),
		},
	);

	return (
		<Container>
			<Typography variant={'h5'}>{t('header')}</Typography>
			<Grid container direction={'column'} spacing={2} mt={4}>
				<Grid item>
					<TextField
						fullWidth
						required
						label={t('address')}
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						required
						multiline
						rows={4}
						label={t('description')}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button
						fullWidth
						variant={'contained'}
						disabled={!address || !description || isCreateIncidentLoading}
						onClick={() => createIncident()}
					>
						{t('create')}
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default AddIncidentPage;
