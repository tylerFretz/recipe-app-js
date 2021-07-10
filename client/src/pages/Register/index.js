import React from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegisterForm from './RegisterForm';

import useUsers from '../../hooks/useUsers';
import { useAuthUser } from '../../hooks/useAuthUser';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: '10% 0%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const Register = () => {
	const classes = useStyles();
	const { authUser } = useAuthUser();
	const { addUser } = useUsers();

	const onSubmit = (values) => {
		console.log(values);
		addUser(values.username, values.email, values.password);
	};

	return authUser ? (
		<Redirect to="/" />
	) : (
		<Container maxWidth="xs" style={{ minHeight: '100%' }}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<RegisterForm onSubmit={onSubmit} />
			</div>
		</Container>
	);
};

export default Register;
