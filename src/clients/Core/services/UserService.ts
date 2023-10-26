/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterUserRequest } from '../models/RegisterUserRequest';
import type { UserResponse } from '../models/UserResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody
     * @returns UserResponse
     * @throws ApiError
     */
    public static register(
        requestBody: RegisterUserRequest,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserResponse
     * @throws ApiError
     */
    public static getCurrent(): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/current',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
