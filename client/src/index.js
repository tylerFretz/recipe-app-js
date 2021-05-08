/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import App from "./App";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseLine from "@material-ui/core/CssBaseline";

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={3}>
				<Router>
					<CssBaseLine />
					<App />
				</Router>
			</SnackbarProvider>
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);
