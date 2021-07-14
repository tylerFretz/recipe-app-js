import React from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginForm from './LoginForm';

import { useAuthUser } from '../../hooks/useAuthUser';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const Login = () => {
	const classes = useStyles();
	const { authUser } = useAuthUser();


	return authUser ? (
		<Redirect to="/" />
	) : (
		<Container maxWidth="xs" style={{ minHeight: '80vh' }}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in
				</Typography>
				<LoginForm />
				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="/register" variant="body2">
							{'Don\'t have an account? Sign Up'}
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Login;
