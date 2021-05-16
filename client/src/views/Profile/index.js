import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
	const { user, isLoggedIn } = useSelector(state => state.auth);

	if (!isLoggedIn || !user) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>Created Recipes: {user.submittedRecipes.length}</p>
		</div>
	);
};

export default Profile;