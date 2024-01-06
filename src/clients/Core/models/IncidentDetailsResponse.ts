/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommunityResponse } from './CommunityResponse';
import type { DistrictResponse } from './DistrictResponse';
import type { RegionResponse } from './RegionResponse';
import type { UserResponse } from './UserResponse';

export type IncidentDetailsResponse = {
    address: string;
    description: string;
    regionId: number;
    districtId: number;
    communityId: number;
    id: number;
    createdAt: string;
    acceptedVolunteers: Array<UserResponse>;
    notAcceptedVolunteers: Array<UserResponse>;
    region: RegionResponse;
    district: DistrictResponse;
    community: CommunityResponse;
};

