import React from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import RegisterForm from './RegisterForm';

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
				<RegisterForm />
				<Grid container>
					<Grid item>
						<Link href="/login" variant="body2" underline="hover">
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Register;
