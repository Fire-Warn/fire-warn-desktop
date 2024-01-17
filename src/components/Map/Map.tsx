import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';
import LinearProgress from '@mui/material/LinearProgress';

import { MapContainer } from './Map.styles';
import { googleMapLanguages } from '../../hooks/language/language';
import { Language } from '../../i18n';

const libraries = ['places'] as Libraries;

const Map = ({
	onMapClick,
	marker,
	setMap,
}: {
	onMapClick: (latLng: google.maps.LatLng | null) => void;
	marker: google.maps.LatLng | null;
	setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}) => {
	const { i18n } = useTranslation();
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_API_KEY as string,
		libraries,
		language: googleMapLanguages[i18n.language as Language],
	});

	const defaultCenter = useMemo(() => ({ lat: 51.217582, lng: 24.698065 }), []);

	return (
		<MapContainer>
			{!isLoaded ? (
				<LinearProgress />
			) : (
				<GoogleMap
					mapContainerClassName={'google-map'}
					center={defaultCenter}
					zoom={12}
					onLoad={map => setMap(map)}
					onClick={e => onMapClick(e.latLng)}
				>
					{marker && <Marker position={marker} />}
				</GoogleMap>
			)}
		</MapContainer>
	);
};

export default Map;
