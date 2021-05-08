import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const Profile = () => {
	const { user, isLoggedIn } = useSelector(state => state.auth);

	if (!isLoggedIn || !user) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>Created Recipes:</p>
			<ul>
				{user.recipes.map(recipe => <li key={uuid()}>{recipe.name}</li>)}
			</ul>
		</div>
	);
};

export default Profile;