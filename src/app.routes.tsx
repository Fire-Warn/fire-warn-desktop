import LinearProgress from '@mui/material/LinearProgress';
import { Navigate, Route } from 'react-router';
import React, { memo, Suspense } from 'react';
import { Routes } from 'react-router-dom';

import { AuthContainer } from './components/AuthContainer';
import { useRole } from './context/UserContext';
import { UserRole } from './clients/Core';
import AppWrapper from './components/AppWrapper';

const NO_ROLE = 'NO_ROLE';

interface RoutesConfig {
	path: string;
	element: React.ReactElement;
	children?: RoutesConfig[];
	allowedRoles?: Array<UserRole | typeof NO_ROLE>;
}

const LazyUsers = React.lazy(() => import('./pages/UsersPage'));
const LazyIncidents = React.lazy(() => import('./pages/IncidentsPage'));
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazySetPassword = React.lazy(() => import('./pages/SetPassword'));
// const LazyForgotPasswordReset = React.lazy(() => import('containers/ForgotPasswordReset'));
// const LazyForgotPasswordEmail = React.lazy(() => import('containers/ForgotPasswordEmail'));

export const appPaths = {
	auth: {
		url: 'auth',
		children: {
			login: 'login',
			forgotPasswordEmail: 'forgotPasswordEmail',
			forgotPasswordReset: 'forgotPasswordReset',
			setPassword: 'setPassword',
		},
	},
	users: 'users',
	incidents: 'incidents',
};

const allRoutes: RoutesConfig[] = [
	{
		path: appPaths.auth.url,
		allowedRoles: [NO_ROLE, 'Admin', 'RegionalAdmin', 'CommunityAdmin', 'Volunteer', 'Operator'],
		element: <AuthContainer />,
		children: [
			{ path: appPaths.auth.children.login, element: <LazyLogin /> },
			{ path: appPaths.auth.children.setPassword, element: <LazySetPassword /> },
			// { path: appPaths.auth.children.forgotPasswordEmail, element: <LazyForgotPasswordEmail /> },
			// { path: appPaths.auth.children.forgotPasswordReset, element: <LazyForgotPasswordReset /> },
		],
	},
	{
		path: '',
		allowedRoles: ['Admin', 'RegionalAdmin', 'CommunityAdmin', 'Volunteer', 'Operator'],
		element: <AppWrapper />,
		children: [
			{
				path: appPaths.users,
				element: <LazyUsers />,
				allowedRoles: ['Admin', 'RegionalAdmin', 'CommunityAdmin'],
			},
			{
				path: appPaths.incidents,
				element: <LazyIncidents />,
				allowedRoles: ['Admin', 'RegionalAdmin', 'CommunityAdmin', 'Operator'],
			},
		],
	},
];

export const homePaths: Record<UserRole | typeof NO_ROLE, string> = {
	Admin: appPaths.users,
	RegionalAdmin: appPaths.users,
	CommunityAdmin: appPaths.users,
	Volunteer: appPaths.users,
	Operator: appPaths.incidents,
	[NO_ROLE]: 'auth/login',
};

function genRoutes(routes: RoutesConfig[], role?: UserRole | typeof NO_ROLE) {
	return routes
		.filter(({ allowedRoles }) => {
			if (!allowedRoles) return true;
			if (!role) return false;
			return allowedRoles.includes(role);
		})
		.map(({ path, element, children }) => {
			const suspendedElement = <Suspense fallback={<LinearProgress />}>{element}</Suspense>;

			return children ? (
				<Route key={path} path={path} element={suspendedElement}>
					{genRoutes(children, role)}
				</Route>
			) : (
				<Route key={path} path={path} element={suspendedElement} />
			);
		});
}

const AuthRoutes = memo(({ role = NO_ROLE }: { role?: UserRole | typeof NO_ROLE }) => {
	return (
		<Routes>
			{genRoutes(allRoutes, role)}
			<Route path={'*'} element={<Navigate to={homePaths[role]} replace />} />
		</Routes>
	);
});

export function AppRoutes() {
	return <AuthRoutes role={useRole()} />;
}
