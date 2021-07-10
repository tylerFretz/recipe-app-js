import React from 'react';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

import SubmitRecipeContainer from './SubmitRecipeContainer';
import { useAuthUser } from '../../hooks/useAuthUser';
import useRecipes from '../../hooks/useRecipes';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .max(256, 'Too long!')
        .required('Recipe title is required.'),
    category: yup.string().nullable(),
    area: yup.string().nullable(),
    instructions: yup.string().required('Instructions are required.'),
    ingredients: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Required'),
            measure: yup.string().required('Required'),
        })
    ),
    thumbImageUrl: yup
        .string()
        .transform((v) => (v === '' ? null : v))
        .url('Must be a URL')
        .nullable(),
    youtubeUrl: yup
        .string()
        .transform((v) => (v === '' ? null : v))
        .url('Must be a URL')
        .nullable(),
    sourceUrl: yup
        .string()
        .transform((v) => (v === '' ? null : v))
        .url('Must be a URL')
        .nullable(),
    tags: yup.array().of(yup.string()).max(5, 'Max 5 tags.'),
    summary: yup
        .string()
        .trim()
        .max(256, 'Summary has a maximum of 256 characters.')
        .nullable(),
    prepTime: yup
        .number()
        .typeError('Must be a number')
        .min(0, 'Minimum prep time is 0'),
    cookTime: yup
        .number()
        .typeError('Must be a number')
        .min(0, 'Minimum cook time is 0'),
    servings: yup
        .number()
        .typeError('Must be a number')
        .min(0, 'Minimum servings is 1'),
});

const SubmitRecipe = () => {
    const { addRecipe } = useRecipes();
    const { authUser } = useAuthUser();

    const onSubmit = (values) => {
        const newRecipe = {
            name: values.name,
            category: values.category,
            area: values.area,
            instructions: values.instructions,
            ingredients: values.ingredients,
            tags: values.tags,
            summary: values.summary,
        };

        if (values.prepTime !== '') newRecipe.prepTime = values.prepTime;
        if (values.cookTime !== '') newRecipe.cookTime = values.cookTime;
        if (values.servings !== '') newRecipe.servings = values.servings;
        if (values.thumbImageUrl !== '')
            newRecipe.thumbImageUrl = values.thumbImageUrl;
        if (values.youtubeUrl !== '') newRecipe.youtubeUrl = values.youtubeUrl;
        if (values.sourceUrl !== '') newRecipe.sourceUrl = values.sourceUrl;

        addRecipe(newRecipe);
    };

    return authUser ? (
        <SubmitRecipeContainer
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    ) : (
        <Redirect to="/login" />
    );
};

export default SubmitRecipe;
