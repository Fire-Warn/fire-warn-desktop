import { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import FormDialog from '../../components/FormDialog';
import { useConfirmDialog } from '../../components/ConfirmDialog';
import { UserRole, UserService } from '../../clients/Core';
import { useSnackbarOnError } from '../../hooks/notistack';
import { entities } from '../../consts/entities';
import { useRole } from '../../context/UserContext';
import { WTextField } from './UsersPage.styles';
import { useRegions } from '../../hooks/entities/regions';
import { useRegionCommunities } from '../../hooks/entities/regionCommunities';
import useTranslateEnum from '../../hooks/language/useTranslateEnum';

export default function UserUpsert({
	isOpened,
	onClose,
}: {
	isOpened: boolean;
	onClose: Dispatch<void>;
}) {
	const { t } = useTranslation('usersPage', { keyPrefix: 'userUpsert' });
	const tEnum = useTranslateEnum<UserRole>({ keyPrefix: 'role' });

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState<UserRole>('Volunteer');
	const [regionId, setRegionId] = useState<number>(0);
	const [communityId, setCommunityId] = useState<number>(0);

	const { regions, isLoading: isRegionsLoading } = useRegions();
	const { communities, isLoading: isCommunitiesLoading } = useRegionCommunities(regionId);
	const queryClient = useQueryClient();
	const confirmDialog = useConfirmDialog();
	const currentUserRole = useRole();

	const rolesAllowedToCreate: Record<UserRole, Array<UserRole>> = {
		Admin: ['RegionalAdmin', 'CommunityAdmin', 'Volunteer', 'Operator'],
		RegionalAdmin: ['CommunityAdmin', 'Volunteer', 'Operator'],
		CommunityAdmin: ['Volunteer'],
		Volunteer: [],
		Operator: [],
	};

	const { mutateAsync: createUser } = useMutation(
		() =>
			UserService.createUser({
				email,
				phone,
				firstName,
				lastName,
				role,
				regionId,
				communityId,
			}),
		{
			onError: useSnackbarOnError(),
			onSuccess: response => {
				confirmDialog({
					type: 'info',
					title: t('successDialog.title'),
					description: (
						<>
							<Typography>
								{t('successDialog.description1', {
									firstName: response.firstName,
									lastName: response.lastName,
								})}
							</Typography>
							<Typography>{t('successDialog.description2', { email: response.email })}</Typography>
						</>
					),
					confirmText: t('successDialog.confirmText'),
				});
				return queryClient.invalidateQueries(entities.usersList);
			},
		},
	);

	return (
		<FormDialog
			acceptText={t('confirm')}
			open={isOpened}
			title={t('title')}
			onClose={onClose}
			submittedCb={() => createUser()}
			confirmDisabled={
				!email || !phone || !firstName || !lastName || !role || !regionId || !communityId
			}
		>
			<WTextField
				value={email}
				label={t('email')}
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<WTextField
				value={phone}
				label={t('phoneNumber')}
				onChange={(e: any) => setPhone(e.target.value)}
			/>
			<WTextField
				value={firstName}
				label={t('firstName')}
				onChange={(e: any) => setFirstName(e.target.value)}
			/>
			<WTextField
				value={lastName}
				label={t('lastName')}
				onChange={(e: any) => setLastName(e.target.value)}
			/>
			<Autocomplete
				value={role}
				onChange={(e, role) => {
					setRole(role);
				}}
				disableClearable
				renderInput={props => <WTextField label={t('role')} {...props} />}
				getOptionLabel={(role: UserRole) => tEnum(role)}
				options={rolesAllowedToCreate[currentUserRole as UserRole]}
			/>
			<Autocomplete
				value={regionId}
				onChange={(e, regionId) => {
					setRegionId(regionId);
				}}
				disableClearable
				renderInput={props => <WTextField label={t('region')} {...props} />}
				getOptionLabel={(regionId: number) => regions?.find(r => r.id === regionId)?.name || ''}
				options={regions?.map(region => region.id) || []}
			/>
			<Autocomplete
				value={communityId}
				onChange={(e, communityId) => {
					setCommunityId(communityId);
				}}
				disableClearable
				disabled={!regionId || !communities?.length || isCommunitiesLoading}
				renderInput={props => <WTextField label={t('community')} {...props} />}
				getOptionLabel={(communityId: number) =>
					communities?.find(c => c.id === communityId)?.name || ''
				}
				options={communities?.map(community => community.id) || []}
			/>
		</FormDialog>
	);
}
