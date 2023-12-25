import { useQuery } from 'react-query';

import { entities } from '../../consts/entities';
import { CommunityResponse, LocalityService } from '../../clients/Core';
import { useSnackbarOnError } from '../notistack';

export function useCommunities({
	districtId,
	regionId,
}: {
	districtId?: number;
	regionId?: number;
}): {
	communities: Array<CommunityResponse> | undefined;
	isLoading: boolean;
} {
	const { data: districtCommunitiesResponse, isLoading: isDistrictCommunitiesLoading } = useQuery(
		[entities.communities, districtId],
		() => LocalityService.getDistrictCommunities(districtId as number),
		{
			onError: useSnackbarOnError(),
			enabled: !!districtId,
		},
	);

	const { data: regionCommunitiesResponse, isLoading: isRegionCommunitiesLoading } = useQuery(
		[entities.communities, regionId],
		() => LocalityService.getRegionCommunities(regionId as number),
		{
			onError: useSnackbarOnError(),
			enabled: !!regionId,
		},
	);

	return {
		communities: districtCommunitiesResponse?.list || regionCommunitiesResponse?.list,
		isLoading: isDistrictCommunitiesLoading || isRegionCommunitiesLoading,
	};
}
