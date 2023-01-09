import { Container, Link as MuiLink, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../../components/Banner';
import LoadingIndicator from '../../components/LoadingIndicator';
import useUsers from '../../hooks/useUsers';

const UsersList = () => {
	const { getAllUsers } = useUsers();
	const { data, isLoading, error } = getAllUsers();

	const styles = {
		link: {
			textDecoration: 'none',
			display: 'block',
			width: '50%',
		},
		userContainer: {
			margin: '3% 0%',
			border: '1px solid black',
		}
	};

	if (error) {
		return <div>Error getting users...</div>;
	}

	if (isLoading) {
		return <LoadingIndicator />;
	}

	return (
		<>
			<Banner
				title="Members"
				breadcrumbList={[{ title: 'Members', path: 'users' }]}
			/>
			<Container>
				{data.map((user) => (
					<MuiLink
						key={user.id}
						to={{
							pathname: `/users/${user.id}`,
							state: { page: 'submitted' }
						}}
						sx={styles.link}
						component={Link}
					>
						<Container sx={styles.userContainer}>
							<Typography>Username: {user.username}</Typography>
							<Typography>
								Join Date:{' '}
								{format(
									new Date(user.joinDate),
									'MMMM dd, yyyy'
								)}
							</Typography>
							<Typography>
								Submitted Recipes:{' '}
								{user.submittedRecipes.length}
							</Typography>
						</Container>
					</MuiLink>
				))}
			</Container>
		</>
	);
};

export default UsersList;
