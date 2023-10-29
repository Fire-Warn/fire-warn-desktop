import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiStylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { OpenAPI as CoreOpenAPi } from './clients/Core';
import { ConfirmDialog, ConfirmDialogContextProvider } from './components/ConfirmDialog';
import { SnackbarProvider } from './hooks/notistack';
import { useAutoTokenRefresh } from './hooks/auth';
import { UserContextProvider } from './context/UserContext';
import theme, { GlobalStyle } from './themes';
import { AppRoutes } from './app.routes';

function render() {
	const container = document.getElementById('app');
	const root = createRoot(container); // createRoot(container!) if you use TypeScript
	root.render(<App />);
}

CoreOpenAPi.BASE = process.env.APP_CORE_URL;

function App() {
	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
}

function Routing() {
	useAutoTokenRefresh();

	return (
		<UserContextProvider>
			<ConfirmDialog />
			<AppRoutes />
		</UserContextProvider>
	);
}

render();
