import * as ReactDOM from 'react-dom';
import MuiStylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import theme from './themes';

function render() {
	ReactDOM.render(<App />, document.body);
}

function App() {
	return (
		<StyledThemeProvider theme={theme}>
			<MuiStylesProvider injectFirst>
				<StyledEngineProvider injectFirst>
					<MuiThemeProvider theme={theme}>
						<Button variant={'outlined'}>Testing button</Button>
					</MuiThemeProvider>
				</StyledEngineProvider>
			</MuiStylesProvider>
		</StyledThemeProvider>
	);
}

render();
