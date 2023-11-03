import { useQuery } from 'react-query';

import { entities } from '../../consts/entities';
import { LocalityService, RegionResponse } from '../../clients/Core';
import { useSnackbarOnError } from '../notistack';

export function useRegions(): { regions: Array<RegionResponse> | undefined; isLoading: boolean } {
	const { data: response, isLoading } = useQuery(
		[entities.regions],
		LocalityService.getAllRegions,
		{
			onError: useSnackbarOnError(),
		},
	);

	return {
		regions: response?.list,
		isLoading,
	};
}
