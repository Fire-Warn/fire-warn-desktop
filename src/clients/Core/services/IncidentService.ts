/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateIncidentRequest } from '../models/CreateIncidentRequest';
import type { IncidentDetailsResponse } from '../models/IncidentDetailsResponse';
import type { IncidentListResponse } from '../models/IncidentListResponse';
import type { IncidentResponse } from '../models/IncidentResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IncidentService {

    /**
     * @param requestBody
     * @returns IncidentResponse
     * @throws ApiError
     */
    public static createIncident(
        requestBody: CreateIncidentRequest,
    ): CancelablePromise<IncidentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/incidents',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param page
     * @param rowsPerPage
     * @param order
     * @param orderBy
     * @param filters
     * @returns IncidentListResponse
     * @throws ApiError
     */
    public static getAllIncidents(
        page: number,
        rowsPerPage: number,
        order?: 'ASC' | 'DESC',
        orderBy?: 'incident.created_at',
        filters?: Array<string>,
    ): CancelablePromise<IncidentListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/incidents',
            query: {
                'page': page,
                'rowsPerPage': rowsPerPage,
                'order': order,
                'orderBy': orderBy,
                'filters': filters,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @returns IncidentDetailsResponse
     * @throws ApiError
     */
    public static getIncidentDetails(
        id: number,
    ): CancelablePromise<IncidentDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/incidents/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
