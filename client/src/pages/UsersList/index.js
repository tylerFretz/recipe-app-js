import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Banner from '../../components/Banner';
import LoadingIndicator from '../../components/LoadingIndicator';
import useUsers from '../../hooks/useUsers';

const useStyles = makeStyles({
	link: {
		textDecoration: 'none',
		display: 'block',
		width: '50%',
	},
	userContainer: {
		margin: '3% 0%',
		border: '1px solid black',
	},
});

const UsersList = () => {
	const classes = useStyles();
	const { getAllUsers } = useUsers();
	const { data, isLoading, error } = getAllUsers();

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
					<Link
						key={user.id}
						to={{
							pathname: `/users/${user.id}`,
							state: { page: 'submitted' }
						}}
						className={classes.link}
					>
						<Container className={classes.userContainer}>
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
					</Link>
				))}
			</Container>
		</>
	);
};

export default UsersList;
