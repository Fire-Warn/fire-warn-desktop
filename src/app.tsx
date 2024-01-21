import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
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
import i18n from './i18n';

function render() {
	const container = document.getElementById('app') as HTMLElement;
	const root = createRoot(container); // createRoot(container!) if you use TypeScript
	root.render(<App />);
}

CoreOpenAPi.BASE = window.env.APP_CORE_URL;

function App() {
	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
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
			</I18nextProvider>
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
