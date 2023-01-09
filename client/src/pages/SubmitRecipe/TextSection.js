import { Grid, Typography } from '@mui/material';
import { Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import React from 'react';

const TextSection = () => {
	return (
		<>
			<Grid item xs={12} sx={{ marginBottom: '2%' }}>
				<Typography variant="h4">Add Basic Info</Typography>
			</Grid>
			<Grid item xs={12}>
				<Field
					component={FormikTextField}
					name="name"
					label="Recipe title"
					placeholder="Max 256 characters"
					variant="outlined"
					fullWidth
					required
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					component={FormikTextField}
					name="instructions"
					label="Recipe Instructions"
					placeholder="Put each step on its own line."
					variant="outlined"
					multiline={true}
					rows={4}
					fullWidth
					required
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					component={FormikTextField}
					name="summary"
					label="Recipe Summary"
					placeholder="Max 256 characters."
					variant="outlined"
					multiline={true}
					fullWidth
					rows={3}
				/>
			</Grid>
		</>
	);
};

export default TextSection;
