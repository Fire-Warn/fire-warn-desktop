/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LatLngRequest } from './LatLngRequest';

export type CreateIncidentRequest = {
    address: string;
    description: string;
    communityId: number;
    geo: LatLngRequest | null;
};

