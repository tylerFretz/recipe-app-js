import { Grid, useTheme } from '@mui/material';
import { Form } from 'formik';
import React from 'react';

import IngredientsSection from './IngredientsSection';
import LinkSection from './LinkSection';
import MetaSection from './MetaSection';
import TextSection from './TextSection';

const SubmitRecipeForm = ({ values, errors, touched, step }) => {
	const theme = useTheme();

	const styles = {
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
	};

	return (
		<Form className={styles.form}>
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
