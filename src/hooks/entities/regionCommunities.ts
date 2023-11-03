import { useQuery } from 'react-query';

import { entities } from '../../consts/entities';
import { CommunityResponse, LocalityService } from '../../clients/Core';
import { useSnackbarOnError } from '../notistack';

export function useRegionCommunities(regionId: number): {
	communities: Array<CommunityResponse> | undefined;
	isLoading: boolean;
} {
	const { data: response, isLoading } = useQuery(
		[entities.communities, regionId],
		() => LocalityService.getRegionCommunities(regionId),
		{
			onError: useSnackbarOnError(),
			enabled: !!regionId,
		},
	);

	return {
		communities: response?.list,
		isLoading,
	};
}
