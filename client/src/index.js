/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { reducer, StateProvider } from "./state";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<StateProvider reducer={reducer}>
		<Router>
			<App />
		</Router>
	</StateProvider>,
	document.getElementById("root")
);
