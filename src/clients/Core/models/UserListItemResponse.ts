/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommunityResponse } from './CommunityResponse';
import type { RegionResponse } from './RegionResponse';
import type { UserRole } from './UserRole';

export type UserListItemResponse = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone: string;
    regionId: number;
    communityId: number;
    community: CommunityResponse;
    region: RegionResponse;
};

