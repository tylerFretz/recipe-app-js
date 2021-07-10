import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'formik';
import Grid from '@material-ui/core/Grid';

import IngredientsSection from './IngredientsSection';
import LinkSection from './LinkSection';
import MetaSection from './MetaSection';
import TextSection from './TextSection';

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

const SubmitRecipeForm = ({ values, errors, touched, step }) => {
	const classes = useStyles();

	return (
		<Form className={classes.form}>
			<Grid container spacing={2}>
				{step === 1 && <TextSection />}
				{step === 2 && (
					<IngredientsSection values={values} errors={errors} />
				)}
				{step === 3 && (
					<MetaSection errors={errors} touched={touched} />
				)}
				{step === 4 && <LinkSection values={values} errors={errors} />}
			</Grid>
		</Form>
	);
};

export default SubmitRecipeForm;
