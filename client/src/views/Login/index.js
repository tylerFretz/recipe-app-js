import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoginForm from "./LoginForm";

import { login } from "../../store/actions/authActions";

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

const Login = () => {
	const classes = useStyles();
	const [redirectPath, setRedirectPath] = useState("/");
	const { state } = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (state && state.from && state.from === "/login") {
			setRedirectPath("/");
		}
		else if (state && state.from) {
			setRedirectPath(state.from);
		}
	}, [state]);


	const onSubmit = (values) => {
		console.log(values);
		dispatch(login(values.email, values.password))
			.then(() => {
				history.push(redirectPath);
			})
			.catch(() => console.error("¯\\_(ツ)_/¯"));
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in
				</Typography>

				<LoginForm onSubmit={onSubmit} />

				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
					Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="#" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Login;