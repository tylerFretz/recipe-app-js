/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseLine from "@material-ui/core/CssBaseline";
import AuthProvider from "./AuthContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000
		}
	}
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
	document.getElementById("root")
);
