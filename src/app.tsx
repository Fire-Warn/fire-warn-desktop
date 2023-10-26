import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiStylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { ConfirmDialog, ConfirmDialogContextProvider } from './components/ConfirmDialog';
import { SnackbarProvider } from './hooks/notistack';
import { useAutoTokenRefresh } from './hooks/auth';
import { UserContextProvider } from './context/UserContext';
import theme, { GlobalStyle } from './themes';

function render() {
	const container = document.getElementById('app');
	const root = createRoot(container); // createRoot(container!) if you use TypeScript
	root.render(<App />);
}

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<StyledThemeProvider theme={theme}>
				<MuiStylesProvider injectFirst>
					<StyledEngineProvider injectFirst>
						<MuiThemeProvider theme={theme}>
							<ConfirmDialogContextProvider>
								<SnackbarProvider>
									<GlobalStyle />
									<Routing />
								</SnackbarProvider>
							</ConfirmDialogContextProvider>
						</MuiThemeProvider>
					</StyledEngineProvider>
				</MuiStylesProvider>
			</StyledThemeProvider>
		</QueryClientProvider>
	);
}

function Routing() {
	useAutoTokenRefresh();

	return (
		<UserContextProvider>
			<ConfirmDialog />
			<Button variant={'outlined'}>Testing button</Button>
			{/*<AppRoutes />*/}
		</UserContextProvider>
	);
}

render();
