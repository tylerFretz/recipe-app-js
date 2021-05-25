import React from "react";
import { Redirect } from "react-router-dom";

import useAuthUser from "../../hooks/useAuthUser";

const Profile = () => {
	const { getAuthUser } = useAuthUser();
	const loggedInUser = getAuthUser();

	if (!loggedInUser) {
		return <Redirect to="/login" />;
	}

	const { submittedRecipes, email, username } = loggedInUser;

	return (
		<div>
			<p>Username: {username}</p>
			<p>Email: {email}</p>
			<p>Created Recipes: {submittedRecipes.length}</p>
		</div>
	);
};

export default Profile;