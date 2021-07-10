import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

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

const RegisterForm = ({ onSubmit }) => {
    const classes = useStyles();
    const [pVisible, setPVisible] = useState(false);
    const [pCVisible, setPCVisible] = useState(false);

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'Username is required.';
                } else if (values.username.length < 3) {
                    errors.username = 'Username must be at least 5 characters.';
                }
                if (!values.email) {
                    errors.email = 'Email Address is required.';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = 'Invalid email address.';
                }
                if (!values.password) {
                    errors.password = 'Password is required.';
                } else if (values.password.length < 8) {
                    errors.password = 'Password must be at least 8 characters.';
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
            {({ submitForm }) => (
                <Form className={classes.form}>
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
                                            >
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
                                type={pCVisible ? 'text' : 'password'}
                                label="Confirm password"
                                variant="outlined"
                                className={classes.feild}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setPCVisible(!pCVisible)
                                                }
                                            >
                                                {pCVisible ? (
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
                        fullWidth
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
