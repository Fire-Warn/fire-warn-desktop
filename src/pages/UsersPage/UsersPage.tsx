import { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, ukUA } from '@mui/x-data-grid';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { useSnackbarOnError } from '../../hooks/notistack';
import { entities } from '../../consts/entities';
import { UserListItemResponse, UserRole, UserService } from '../../clients/Core';
import UserUpsert from './UsersPage.upsert';
import useTranslateEnum from '../../hooks/language/useTranslateEnum';

function UsersPage() {
	const { t } = useTranslation('usersPage');
	const tEnum = useTranslateEnum<UserRole>({ keyPrefix: 'role' });
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [isUserUpsertOpened, setIsUserUpsertOpened] = useState(false);
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: 10,
	});

	const { data: usersList, isLoading: isUsersListLoading } = useQuery(
		[entities.usersList, paginationModel.page, paginationModel.pageSize],
		() => UserService.getAllUsers(paginationModel.page, paginationModel.pageSize),
		{
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			<Container
				sx={{
					padding: 0,
				}}
			>
				<Grid
					container
					mb={3}
					justifyContent={'space-between'}
					alignItems={'center'}
					direction={isSmallScreen ? 'column' : 'row'}
				>
					<Typography variant={'h4'}>{t('header')}</Typography>
					<Button
						fullWidth={isSmallScreen}
						variant={'contained'}
						onClick={() => setIsUserUpsertOpened(true)}
					>
						<AddIcon />
						<Typography ml={1}>{t('add')}</Typography>
					</Button>
				</Grid>

				{isUsersListLoading && <LinearProgress />}
				{usersList && (
					<DataGrid
						localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
						rows={usersList.list}
						columns={[
							{ field: 'id', headerName: t('columns.id'), width: 90 },
							{
								field: 'DOES NOT MATTER(1)',
								headerName: t('columns.name'),
								valueGetter: ({ row }: { row: UserListItemResponse }) =>
									`${row.firstName} ${row.lastName}`,
								minWidth: 250,
								flex: 1,
							},
							{
								field: 'email',
								headerName: t('columns.email'),
								minWidth: 200,
							},
							{
								field: 'phone',
								headerName: t('columns.phone'),
								minWidth: 150,
							},
							{
								field: 'role',
								headerName: t('columns.role'),
								minWidth: 150,
								valueGetter: ({ row }: { row: UserListItemResponse }) => tEnum(row.role),
							},
							{
								field: 'DOES NOT MATTER(2)',
								headerName: t('columns.region'),
								valueGetter: ({ row }: { row: UserListItemResponse }) => row.region.name,
								minWidth: 250,
							},
							{
								field: 'DOES NOT MATTER(3)',
								headerName: t('columns.district'),
								valueGetter: ({ row }: { row: UserListItemResponse }) => row.district?.name || '-',
								minWidth: 350,
							},
							{
								field: 'DOES NOT MATTER(4)',
								headerName: t('columns.community'),
								valueGetter: ({ row }: { row: UserListItemResponse }) => row.community?.name || '-',
								minWidth: 350,
							},
						].map(def => ({
							...def,
							filterable: false,
							sortable: false,
							disableColumnMenu: true,
						}))}
						rowCount={usersList.total}
						paginationModel={paginationModel}
						onPaginationModelChange={setPaginationModel}
						pageSizeOptions={[5, 10]}
						checkboxSelection
						disableRowSelectionOnClick
						paginationMode='server'
					/>
				)}
			</Container>
			<UserUpsert isOpened={isUserUpsertOpened} onClose={() => setIsUserUpsertOpened(false)} />
		</>
	);
}

export default UsersPage;
