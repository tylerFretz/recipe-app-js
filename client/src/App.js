import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleRecipe from './pages/SingleRecipe';
import SubmitRecipe from './pages/SubmitRecipe';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import RecipeSearch from './pages/RecipeSearch';
import UsersList from './pages/UsersList';
import Categories from './pages/Categories';

const App = () => (
	<>
		<ScrollToTop />
		<Header />
		<NavigationBar />
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				background: '#F5F5F5',
				minHeight: '90vh',
			}}
		>
			<Switch>
				<Route path="/recipes/search" component={RecipeSearch} />
				<Route path="/recipes/:id" component={SingleRecipe} />
				<Route exact path="/categories" component={Categories} />
				<Route path="/users/:id" component={Profile} />
				<Route exact path="/users" component={UsersList} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/submit" component={SubmitRecipe} />
				<Route path="/" component={Home} />
			</Switch>
		</div>
		<Footer />
	</>
);

export default App;
