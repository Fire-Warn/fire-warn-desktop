import { Location, useLocation, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useSnackbarOnError } from '../../hooks/notistack';
import { entities } from '../../consts/entities';
import { IncidentService } from '../../clients/Core';
import { appPaths } from '../../app.routes';

function IncidentDetailsPage() {
	const { t } = useTranslation('incidentDetailsPage');
	const params = useParams();
	const navigate = useNavigate();
	const incidentId = parseInt(params.incidentId as string);

	const location = useLocation() as Location<{}>;

	const { data: incident } = useQuery(
		[entities.incident, incidentId],
		() => IncidentService.getIncidentDetails(incidentId),
		{
			refetchInterval: 1500,
			onError: useSnackbarOnError(),
		},
	);

	return (
		<Container>
			<Grid container gap={3}>
				<IconButton onClick={() => navigate(`/${appPaths.incidents}`)}>
					<ArrowBackIcon />
				</IconButton>
				<Typography variant={'h3'}>{t('header')}</Typography>
			</Grid>
			{!incident ? (
				<Box mt={3}>
					<LinearProgress />
				</Box>
			) : (
				<>
					<Typography variant={'h6'} mt={4}>
						{t('region', { region: incident.region.name })}
					</Typography>
					<Typography variant={'h6'}>
						{t('district', { district: incident.district.name })}
					</Typography>
					<Typography variant={'h6'}>
						{t('community', { community: incident.community.name })}
					</Typography>
					<Typography variant={'h6'}>{t('address', { address: incident.address })}</Typography>
					<Typography variant={'h6'}>
						{t('description', { description: incident.description })}
					</Typography>
					<Typography variant={'h6'}>
						{t('acceptedIncident', {
							acceptedIncident:
								incident.acceptedVolunteers.map(v => `${v.firstName} ${v.lastName}`).join(', ') ||
								'-',
						})}
					</Typography>
					<Typography variant={'h6'}>
						{t('notAcceptedIncident', {
							notAcceptedIncident:
								incident.notAcceptedVolunteers
									.map(v => `${v.firstName} ${v.lastName}`)
									.join(', ') || '-',
						})}
					</Typography>
				</>
			)}
		</Container>
	);
}

export default IncidentDetailsPage;
