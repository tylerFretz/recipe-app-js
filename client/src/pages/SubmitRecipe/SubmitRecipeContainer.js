import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import SubmitRecipeForm from "./SubmitRecipeForm";

const useStyles = makeStyles({
	formContainer: {
		marginTop: "5%",
	}
});

const initialValues = {
	name: "",
	category: "",
	area: "",
	instructions: "",
	ingredients: [
		{
			name: "",
			measure: "",
		},
	],
	thumbImageUrl: "",
	youtubeUrl: "",
	tags: [],
	sourceUrl: "",
	summary: "",
	prepTime: 0,
	cookTime: 0,
	servings: 1
};

const SubmitRecipeContainer = ({ onSubmit, validationSchema }) => {
	const classes = useStyles();

	return (
		<Container className={classes.formContainer}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ values, errors }) => <SubmitRecipeForm values={values} errors={errors} />}
			</Formik>
		</Container>
	);
};

export default SubmitRecipeContainer;