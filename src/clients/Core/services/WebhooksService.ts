/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegionListResponse } from '../models/RegionListResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebhooksService {

    /**
     * @returns RegionListResponse
     * @throws ApiError
     */
    public static handleUnitalkWebhook(): CancelablePromise<RegionListResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhooks/unitalk',
        });
    }

}
