/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

export type CreateUserRequest = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    regionId: number;
    communityId: number;
};

