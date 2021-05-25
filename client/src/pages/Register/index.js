import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import RegisterForm from "./RegisterForm";

import useUsers from "../../hooks/useUsers";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const Register = () => {
	const classes = useStyles();
	const { addUser } = useUsers();

	const onSubmit = (values) => {
		console.log(values);
		addUser(values.username, values.email, values.password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				<RegisterForm onSubmit={onSubmit} />

				<Grid container justify="flex-end">
					<Grid item>
						<Link href="#" variant="body2">
					Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Register;