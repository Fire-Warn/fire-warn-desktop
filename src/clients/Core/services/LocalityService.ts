/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommunityListResponse } from '../models/CommunityListResponse';
import type { DistrictListResponse } from '../models/DistrictListResponse';
import type { RegionListResponse } from '../models/RegionListResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocalityService {

    /**
     * @returns RegionListResponse
     * @throws ApiError
     */
    public static getAllRegions(): CancelablePromise<RegionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locality/regions',
        });
    }

    /**
     * @param id
     * @returns DistrictListResponse
     * @throws ApiError
     */
    public static getRegionDistricts(
        id: number,
    ): CancelablePromise<DistrictListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locality/regions/{id}/districts',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns CommunityListResponse
     * @throws ApiError
     */
    public static getRegionCommunities(
        id: number,
    ): CancelablePromise<CommunityListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locality/regions/{id}/communities',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns CommunityListResponse
     * @throws ApiError
     */
    public static getDistrictCommunities(
        id: number,
    ): CancelablePromise<CommunityListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locality/districts/{id}/communities',
            path: {
                'id': id,
            },
        });
    }

}
