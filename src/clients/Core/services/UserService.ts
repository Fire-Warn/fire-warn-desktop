/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { UserListResponse } from '../models/UserListResponse';
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
    public static createUser(
        requestBody: CreateUserRequest,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
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
     * @returns UserListResponse
     * @throws ApiError
     */
    public static getAllUsers(
        page: number,
        rowsPerPage: number,
        order?: 'ASC' | 'DESC',
        orderBy?: 'user.first_name' | 'user.last_name' | 'user.created_at' | 'user.role',
        filters?: Array<string>,
    ): CancelablePromise<UserListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
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
