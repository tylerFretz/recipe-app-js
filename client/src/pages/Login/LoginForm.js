import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { useAuthUser } from '../../hooks/useAuthUser';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
	},
	feild: {
		width: '100%',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const LoginForm = () => {
	const classes = useStyles();
	const [visible, setVisible] = useState(false);
	const { login } = useAuthUser();

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			onSubmit={(values, actions) => {
				login(values.email, values.password);
				actions.setSubmitting(false);
			}}
			validate={(values) => {
				const errors = {};
				if (!values.email) {
					errors.email = 'Email Address is required.';
				} else if (!values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
					errors.email = 'Invalid email address.';
				}
				if (!values.password) {
					errors.password = 'Password is required.';
				}
				return errors;
			}}
		>
			{({ submitForm }) => (
				<Form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="email"
								type="email"
								label="Email Address"
								placeholder="Enter email address"
								variant="outlined"
								className={classes.feild}
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="password"
								type={visible ? 'text' : 'password'}
								label="Password"
								placeholder="Enter password"
								variant="outlined"
								className={classes.feild}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() =>
													setVisible(!visible)
												}
											>
												{visible ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					</Grid>
					<Button
						className={classes.submit}
						variant="contained"
						color="primary"
						onClick={submitForm}
					>
						Sign In
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
