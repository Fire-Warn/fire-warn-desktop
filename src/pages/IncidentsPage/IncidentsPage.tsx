import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import { DataGrid, GridRenderCellParams, ukUA } from '@mui/x-data-grid';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { useSnackbarOnError } from '../../hooks/notistack';
import { entities } from '../../consts/entities';
import { IncidentListItemResponse, IncidentService } from '../../clients/Core';
import { appPaths } from '../../app.routes';
import { useRole } from '../../context/UserContext';

function IncidentsPage() {
	const { t } = useTranslation('incidentsListPage');
	const navigate = useNavigate();
	const theme = useTheme();
	const role = useRole();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: 10,
	});

	const { data: incidentsList, isLoading: isIncidentsListLoading } = useQuery(
		[entities.incidentsList, paginationModel.page, paginationModel.pageSize],
		() => IncidentService.getAllIncidents(paginationModel.page, paginationModel.pageSize),
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
					{role === 'Operator' && (
						<Button
							fullWidth={isSmallScreen}
							variant={'contained'}
							onClick={() => navigate(`/${appPaths.addIncident}`)}
						>
							<AddIcon />
							<Typography ml={1}>{t('add')}</Typography>
						</Button>
					)}
				</Grid>

				{isIncidentsListLoading && <LinearProgress />}
				{incidentsList?.list.length ? (
					<DataGrid
						localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
						rows={incidentsList.list}
						columns={[
							{ field: 'id', headerName: t('columns.id'), width: 90 },
							{
								field: 'address',
								headerName: t('columns.address'),
								minWidth: 300,
								flex: 1,
							},
							{
								field: 'createdAt',
								headerName: t('columns.createdAt'),
								minWidth: 200,
							},
							{
								field: 'DOES NOT MATTER(1)',
								headerName: t('columns.region'),
								valueGetter: ({ row }: { row: IncidentListItemResponse }) => row.region.name,
								minWidth: 250,
							},
							{
								field: 'DOES NOT MATTER(2)',
								headerName: t('columns.district'),
								valueGetter: ({ row }: { row: IncidentListItemResponse }) => row.district.name,
								minWidth: 250,
							},
							{
								field: 'DOES NOT MATTER(3)',
								headerName: t('columns.community'),
								valueGetter: ({ row }: { row: IncidentListItemResponse }) => row.community.name,
								minWidth: 350,
							},
							{
								field: 'DOES NOT MATTER(4)',
								headerName: '',
								renderCell: (params: GridRenderCellParams) => (
									<Button
										variant={'contained'}
										fullWidth
										onClick={event => {
											event.stopPropagation();
											navigate(`/${appPaths.incidents}/${params.id}/`);
										}}
									>
										{t('view')}
									</Button>
								),
								// rend: ({ row }: { row: IncidentListItemResponse }) => row.community.name,
								minWidth: 150,
							},
						].map(def => ({
							...def,
							filterable: false,
							sortable: false,
							disableColumnMenu: true,
						}))}
						rowCount={incidentsList.total}
						paginationModel={paginationModel}
						onPaginationModelChange={setPaginationModel}
						pageSizeOptions={[5, 10]}
						checkboxSelection
						disableRowSelectionOnClick
						paginationMode='server'
					/>
				) : (
					<Typography align={'center'} variant={'h6'} mt={5}>
						{t('empty')}
					</Typography>
				)}
			</Container>
		</>
	);
}

export default IncidentsPage;
