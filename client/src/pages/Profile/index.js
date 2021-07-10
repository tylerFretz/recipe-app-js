import React from 'react';
import { Redirect, useParams, NavLink } from 'react-router-dom';

import useUsers from '../../hooks/useUsers';

const Profile = () => {
	const { getUserById } = useUsers();
	const { id } = useParams();
	const user = getUserById(id);

	if (!user) {
		return <Redirect to="/login" />;
	}

	if (user.isLoading) {
		return <div>Loading...</div>;
	}

	if (user.error) {
		return <div>Error: 404</div>;
	}

	const { submittedRecipes, savedRecipes, email, username } = user.data;

	return (
		<div>
			<div>
				<h3>Username: </h3>
				<span>{username}</span>
			</div>
			<div>
				<h3>Email: </h3>
				<span>{email}</span>
			</div>
			<div>
				<h3>Submitted Recipes: </h3>
				<ul>
					{submittedRecipes.map((recipe) => (
						<li key={recipe.id}>
							<NavLink to={`/recipes/${recipe.id}`}>
								{recipe.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3>Saved Recipes: </h3>
				<ul>
					{savedRecipes.map((recipe) => (
						<li key={recipe.id}>
							<a href={`recipes/${recipe.id}`}>{recipe.name}</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Profile;
