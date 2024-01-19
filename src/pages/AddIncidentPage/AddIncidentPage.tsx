import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete as GmAutocomplete } from '@react-google-maps/api';

import { IncidentService, LocalityService } from '../../clients/Core';
import { entities } from '../../consts/entities';
import { appPaths } from '../../app.routes';
import { useUser } from '../../context/UserContext';
import { useCommunities } from '../../hooks/entities/communities';
import { WTextField } from '../UsersPage/UsersPage.styles';
import Map from '../../components/Map';
import { useSnackbarOnError } from '../../hooks/notistack';

function AddIncidentPage() {
	const { t } = useTranslation('addIncidentPage');
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const user = useUser();
	const { communities, isLoading } = useCommunities({ districtId: user?.districtId || undefined });

	const [description, setDescription] = useState('');
	const [communityId, setCommunityId] = useState(0);
	const [address, setAddress] = useState('');
	const [marker, setMarker] = useState<google.maps.LatLng | null>(null);

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

	const { mutate: createIncident, isLoading: isCreateIncidentLoading } = useMutation(
		() =>
			IncidentService.createIncident({
				address,
				description,
				communityId,
				geo: marker && { lat: marker.lat(), lng: marker.lng() },
			}),
		{
			onError: useSnackbarOnError(),
			onSuccess: () =>
				queryClient
					.invalidateQueries(entities.incidentsList)
					.then(() => navigate(`/${appPaths.incidents}`)),
		},
	);

	const { data: communityLatLng } = useQuery(
		[entities.communityLatLng, communityId],
		() => LocalityService.getCommunityLatLng(communityId),
		{
			onError: useSnackbarOnError(),
			enabled: !!communityId,
		},
	);

	useEffect(() => {
		if (communityLatLng?.result) {
			map?.setCenter(communityLatLng.result);
		}
	}, [map, communityLatLng]);

	return (
		<Container>
			<Typography variant={'h5'}>{t('header')}</Typography>
			<Grid container direction={'column'} spacing={2} mt={4}>
				<Grid item>
					<Autocomplete
						value={communityId}
						onChange={(e, communityId) => {
							setCommunityId(communityId);
						}}
						disableClearable
						// @ts-ignore
						renderInput={props => <WTextField label={t('community')} {...props} />}
						getOptionLabel={(communityId: number) =>
							communities?.find(c => c.id === communityId)?.name || ''
						}
						options={communities?.map(community => community.id) || []}
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
					{map && (
						<GmAutocomplete
							options={{ bounds: map?.getBounds() }}
							fields={['geometry', 'formatted_address']}
							onPlaceChanged={(...args) => {
								const place = autocomplete?.getPlace();
								setAddress(place?.formatted_address || '');
								setMarker(place?.geometry?.location || null);
							}}
							restrictions={{ country: 'UA' }}
							onLoad={autocomplete => setAutocomplete(autocomplete)}
						>
							<TextField
								label={t('address')}
								value={address}
								onChange={e => setAddress(e.target.value)}
								fullWidth
							/>
						</GmAutocomplete>
					)}
				</Grid>
				{marker && !address && (
					<Grid item>
						<Typography>
							{t('coordinatesAddress', {
								lat: marker.lat().toFixed(5),
								lng: marker.lng().toFixed(5),
							})}
						</Typography>
					</Grid>
				)}
				<Grid item>
					<Map
						setMap={setMap}
						onMapClick={latLng => {
							if (latLng) {
								setMarker(latLng);
								setAddress(
									t('coordinatesAddress', {
										lat: latLng.lat().toString(),
										lng: latLng.lng().toString(),
									}),
								);
							}
						}}
						marker={marker}
					/>
				</Grid>
				<Grid item>
					<Button
						fullWidth
						variant={'contained'}
						disabled={!(address || marker) || !description || isCreateIncidentLoading}
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
