import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from 'formik-material-ui';
import makeStyles from '@mui/styles/makeStyles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import useUsers from '../../hooks/useUsers';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	feild: {
		width: '100%',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// password requirements
// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false,
// 	 pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
// 	 pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }

const RegisterForm = () => {
	const classes = useStyles();
	const [pVisible, setPVisible] = useState(false);
	const { addUser } = useUsers();

	return (
        <Formik
			initialValues={{
				username: '',
				email: '',
				password: '',
				passwordConfirm: '',
				avatarImageUrl: ''
			}}
			onSubmit={(values, actions) => {
				addUser({
					username: values.username,
					email: values.email,
					password: values.password,
					avatarImageUrl: values.avatarImageUrl
				});
				actions.setSubmitting(false);
			}}
			validate={(values) => {
				const errors = {};
				if (!values.username) {
					errors.username = 'Username is required.';
				} else if (values.username.length < 5 || values.username.length > 50) {
					errors.username = 'Username must be between 5 and 50 characters.';
				}
				if (!values.email) {
					errors.email = 'Email Address is required.';
				} else if (!values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
					errors.email = 'Invalid email address.';
				}
				if (!values.password) {
					errors.password = 'Password is required.';
				} else if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
					errors.password = 'Password must contain at least 1 number, 1 special character, 1 uppercase letter, and be 8 or more characters.';
				}
				if (!values.passwordConfirm) {
					errors.passwordConfirm =
						'Password confirmation is required.';
				} else if (values.password !== values.passwordConfirm) {
					errors.password = 'Passwords must match.';
					errors.passwordConfirm = 'Passwords must match.';
				}
				return errors;
			}}
		>
			{({ submitForm, setFieldValue }) => (
				<Form className={classes.form} encType='multipart/form-data' method='post'>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="username"
								label="Display name (what others see)"
								placeholder="Enter a username"
								variant="outlined"
								className={classes.feild}
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="email"
								type="email"
								label="Email Address"
								placeholder="Enter a email address"
								variant="outlined"
								className={classes.feild}
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="password"
								type={pVisible ? 'text' : 'password'}
								label="Password"
								placeholder="Enter a password"
								variant="outlined"
								className={classes.feild}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
													setPVisible(!pVisible)
												}
                                                size="large">
												{pVisible ? (
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
						<Grid item xs={12}>
							<Field
								component={TextField}
								name="passwordConfirm"
								type={pVisible ? 'text' : 'password'}
								label="Confirm password"
								variant="outlined"
								className={classes.feild}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
													setPVisible(!pVisible)
												}
                                                size="large">
												{pVisible ? (
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
						<Grid item xs={12}>
							<Field
								component={DropzoneArea}
								name='avatarImageUrl'
								acceptedFiles={['image/*']}
								dropzoneText="Add an avatar"
								showAlerts={false}
								filesLimit={1}
								onChange={(file) => setFieldValue('avatarImageUrl', file[0])}
							/>
						</Grid>
					</Grid>
					<Button
						className={classes.submit}
						variant="contained"
						color="primary"
						onClick={submitForm}
						fullWidth
					>
						Register
					</Button>
				</Form>
			)}
		</Formik>
    );
};

export default RegisterForm;
