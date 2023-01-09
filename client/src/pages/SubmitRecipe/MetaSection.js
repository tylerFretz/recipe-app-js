import { Grid, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import { Autocomplete, TextField as FormikTextField } from 'formik-mui';
import React from 'react';

import LoadingIndicator from '../../components/LoadingIndicator';
import useRecipes from '../../hooks/useRecipes';

const MetaSection = ({ errors, touched }) => {
	const { queryRecipeData } = useRecipes();
	const { data, isLoading } = queryRecipeData();

	return isLoading ? (
		<LoadingIndicator />
	) : (
		<>
			<Grid item xs={12} sx={{ marginBottom: '2%' }}>
				<Typography variant="h4">
					Add Some More Info (Optional)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Field
					name="category"
					component={Autocomplete}
					options={data.categories}
					getOptionLabel={(option) => option}
					loading={isLoading}
					renderInput={(params) => (
						<TextField
							{...params}
							error={touched['category'] && !!errors['category']}
							helperText={errors['category']}
							label="Category"
							variant="outlined"
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					name="area"
					component={Autocomplete}
					options={data.areas}
					getOptionLabel={(option) => option}
					loading={isLoading}
					renderInput={(params) => (
						<TextField
							{...params}
							style={{ color: 'red' }}
							error={touched['area'] && !!errors['area']}
							helperText={errors['area']}
							label="Area"
							variant="outlined"
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					name="tags"
					component={Autocomplete}
					options={data.tags}
					getOptionLabel={(option) => option}
					loading={isLoading}
					multiple={true}
					limitTags={3}
					filterSelectedOptions={true}
					renderInput={(params) => (
						<TextField
							{...params}
							style={{ color: 'red' }}
							error={touched['tags'] && !!errors['tags']}
							helperText={errors['tags']}
							label="Tags"
							variant="outlined"
						/>
					)}
				/>
			</Grid>
			<Grid item xs={4}>
				<Field
					component={FormikTextField}
					name="prepTime"
					label="Prep Time"
					variant="outlined"
				/>
			</Grid>
			<Grid item xs={4}>
				<Field
					component={FormikTextField}
					name="cookTime"
					label="Cook Time"
					variant="outlined"
				/>
			</Grid>
			<Grid item xs={4}>
				<Field
					component={FormikTextField}
					name="servings"
					label="Servings"
					variant="outlined"
				/>
			</Grid>
		</>
	);
};

export default MetaSection;
