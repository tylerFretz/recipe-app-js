import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import ScrollToTop from './components/ScrollToTop';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeSearch from './pages/RecipeSearch';
import Register from './pages/Register';
import SingleRecipe from './pages/SingleRecipe';
import SubmitRecipe from './pages/SubmitRecipe';
import UsersList from './pages/UsersList';

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
			<Routes>
				<Route path="/recipes/search" component={RecipeSearch} />
				<Route path="/recipes/:id" component={SingleRecipe} />
				<Route exact path="/categories" component={Categories} />
				<Route path="/users/:id" component={Profile} />
				<Route exact path="/users" component={UsersList} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/submit" component={SubmitRecipe} />
				<Route path="/" component={Home} />
			</Routes>
		</div>
		<Footer />
	</>
);

export default App;
