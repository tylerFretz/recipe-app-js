import React from "react";
import * as yup from "yup";

import SubmitRecipeContainer from "./SubmitRecipeContainer";
import { useAuthUser } from "../../hooks/useAuthUser";
import useRecipes from "../../hooks/useRecipes";

const validationSchema = yup.object().shape({
	name: yup.string().max(256, "Too long!").required("Recipe name is required."),
	category: yup.string().nullable(),
	area: yup.string().nullable(),
	instructions: yup.string().required("Instructions are required."),
	ingredients: yup.array().of(
		yup.object().shape({
			name: yup.string().required("Ingredient name is required"),
			measure: yup.string().required("Ingredient measure is required")
		})
	),
	thumbImageUrl: yup.string().url().nullable(),
	youtubeUrl: yup.string().url().nullable(),
	tags: yup.array().of(yup.string()).max(5, "Max 5 tags."),
	summary: yup.string().trim().max(256, "Summary has a maximum of 256 characters.").nullable(),
	prepTime: yup.number().round().min(0, "Minimum prep time is 0"),
	cookTime: yup.number().round().min(0, "Minimum cook time is 0"),
	servings: yup.number().round().min(0, "Minimum servings is 1")
});


const SubmitRecipe = () => {
	const { addRecipe } = useRecipes();
	const { authUser } = useAuthUser();

	if (!authUser) {
		<div>Log in to submit a recipe.</div>;
	}

	const onSubmit = (values) => {
		const newRecipe = {
			name: values.name,
			category: values.category,
			area: values.area,
			instructions: values.instructions,
			ingredients: values.ingredients,
			thumbImageUrl: values.thumbImageUrl,
			youtubeUrl: values.youtubeUrl,
			sourceUrl: values.sourceUrl,
			tags: values.tags,
			summary: values.summary,
			prepTime: values.prepTime,
			cookTime: values.cookTime,
			servings: values.servings
		};
		addRecipe(newRecipe);
	};

	return (
		<SubmitRecipeContainer onSubmit={onSubmit} validationSchema={validationSchema} />
	);
};

export default SubmitRecipe;