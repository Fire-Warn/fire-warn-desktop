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
import { IncidentListItemResponse, IncidentService } from '../../clients/Core';

function IncidentsPage() {
	const { t } = useTranslation('incidentsListPage');
	const theme = useTheme();
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
					<Button
						fullWidth={isSmallScreen}
						variant={'contained'}
						onClick={() => console.log('adding new incident')}
					>
						<AddIcon />
						<Typography ml={1}>{t('add')}</Typography>
					</Button>
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
								headerName: t('columns.community'),
								valueGetter: ({ row }: { row: IncidentListItemResponse }) => row.community.name,
								minWidth: 350,
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
