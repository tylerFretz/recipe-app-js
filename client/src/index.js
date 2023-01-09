/* eslint-disable linebreak-style */
import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './hooks/useAuthUser';
import theme from './theme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

ReactDOM.render(
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					<AuthProvider>
						<Router>
							<CssBaseLine />
							<App />
							<ReactQueryDevtools initialIsOpen={false} />
						</Router>
					</AuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</QueryClientProvider>,
	document.getElementById('root')
);
