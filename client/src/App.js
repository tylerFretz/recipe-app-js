import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Notifier from "./utils/Notifier";

import { setUser } from "./store/actions/authActions";
import { initializeRecipes } from "./store/actions/recipeActions";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import SingleRecipe from "./views/SingleRecipe";
import SubmitRecipe from "./views/SubmitRecipe";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUser());
	}, []);

	useEffect(() => {
		dispatch(initializeRecipes());
	}, [dispatch]);

	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
				<Notifier />
				<Header />
				<Switch>
					<Route path="/recipes/:id" component={SingleRecipe} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/profile" component={Profile} />
					<Route path="/submit" component={SubmitRecipe} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

export default App;