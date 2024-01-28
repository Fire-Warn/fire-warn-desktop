import { useQuery } from 'react-query';

import { entities } from '../../consts/entities';
import { DistrictResponse, LocalityService } from '../../clients/Core';
import { useSnackbarOnError } from '../notistack';

export function useDistricts(regionId: number): {
	districts: Array<DistrictResponse> | undefined;
	isLoading: boolean;
} {
	const { data: response, isLoading } = useQuery(
		[entities.districts, regionId],
		() => LocalityService.getRegionDistricts(regionId),
		{
			onError: useSnackbarOnError(),
			enabled: !!regionId,
		},
	);

	return {
		districts: response?.list,
		isLoading,
	};
}
