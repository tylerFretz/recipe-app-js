import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';
import Banner from '../../components/Banner';
import CardGrid from '../../components/Cards/CardGrid';
import useUsers from '../../hooks/useUsers';

const Profile = () => {
	const { getUserById } = useUsers();
	const { id } = useParams();
	const user = getUserById(id);

	if (user.isLoading) {
		return <LoadingIndicator />;
	}

	if (user.error) {
		return <Redirect to="/" />;
	}

	if (user) {
		console.log(user);
	}

	const { submittedRecipes, savedRecipes, username } = user.data;
	const breadcrumb = [{ title: 'Members', path: 'users' }, { title: username, path: `users/${id}` }];

	return (
		<>
			<Banner
				title={username}
				breadcrumbList={breadcrumb}
			/>
			{submittedRecipes.length > 0 && (
				<CardGrid
					items={submittedRecipes}
					type='profile'
				/>
			)}
		</>
	);
};

export default Profile;
