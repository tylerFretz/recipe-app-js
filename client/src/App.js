import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SingleRecipe from "./pages/SingleRecipe";
import SubmitRecipe from "./pages/SubmitRecipe";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeSearch from "./pages/RecipeSearch";


const App = () => (
	<>
		<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<ScrollToTop />
			<Header />
			<Switch>
				<Route path="/recipes/search" component={RecipeSearch} />
				<Route path="/recipes/:id" component={SingleRecipe} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/profile" component={Profile} />
				<Route path="/submit" component={SubmitRecipe} />
				<Route path="/" component={Home} />
			</Switch>
		</div>
		<Footer />
	</>
);

export default App;