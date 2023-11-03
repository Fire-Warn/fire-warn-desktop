import { useState } from 'react';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid } from '@mui/x-data-grid';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { useSnackbarOnError } from '../../hooks/notistack';
import { entities } from '../../consts/entities';
import { UserListItemResponse, UserService } from '../../clients/Core';
import UserUpsert from './UsersPage.upsert';
import { useUser } from '../../context/UserContext';

function UsersPage() {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [isUserUpsertOpened, setIsUserUpsertOpened] = useState(false);
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 1,
		pageSize: 5,
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
					<Typography variant={'h4'}>Users</Typography>
					<Button
						fullWidth={isSmallScreen}
						variant={'contained'}
						onClick={() => setIsUserUpsertOpened(true)}
					>
						<AddIcon />
						<Typography ml={1}>Add User</Typography>
					</Button>
				</Grid>

				{isUsersListLoading && <LinearProgress />}
				{usersList && (
					<DataGrid
						rows={usersList.list}
						columns={[
							{ field: 'id', headerName: 'ID', width: 90 },
							{
								field: 'DOES NOT MATTER(1)',
								headerName: 'Name',
								valueGetter: ({ row }: { row: UserListItemResponse }) =>
									`${row.firstName} ${row.lastName}`,
								minWidth: 150,
								flex: 1,
							},
							{
								field: 'email',
								headerName: 'Email',
								minWidth: 150,
							},
							{
								field: 'phone',
								headerName: 'Phone',
								minWidth: 150,
							},
							{
								field: 'role',
								headerName: 'Role',
								minWidth: 100,
							},
							{
								field: 'DOES NOT MATTER(2)',
								headerName: 'Region',
								valueGetter: ({ row }: { row: UserListItemResponse }) => row.region.name,
								minWidth: 250,
							},
							{
								field: 'DOES NOT MATTER(3)',
								headerName: 'Community',
								valueGetter: ({ row }: { row: UserListItemResponse }) => row.community.name,
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
