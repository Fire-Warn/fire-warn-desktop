/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommunityResponse } from './CommunityResponse';
import type { RegionResponse } from './RegionResponse';

export type IncidentListItemResponse = {
    address: string;
    description: string;
    regionId: number;
    communityId: number;
    id: number;
    createdAt: string;
    community: CommunityResponse;
    region: RegionResponse;
};

