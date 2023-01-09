import { AddCircle } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { Field, FieldArray } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import React from 'react';

const IngredientsSection = ({ values, errors }) => {
	return (
		<FieldArray name="ingredients">
			{({ remove, push }) => (
				<>
					<Grid item xs={12} sx={{ marginBottom: '2%' }}>
						<Typography variant="h4">Ingredients</Typography>
					</Grid>
					{values.ingredients.length > 0 &&
						values.ingredients.map((i, index) => (
							<Grid container item xs={12} key={index}>
								<Grid
									item
									xs={12}
									sm={4}
									sx={{ marginBottom: '2%' }}
								>
									<Field
										component={FormikTextField}
										name={`ingredients.${index}.name`}
										label="Ingredient*"
										variant="outlined"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={4}
									sx={{ marginBottom: '2%' }}
								>
									<Field
										component={FormikTextField}
										name={`ingredients.${index}.measure`}
										label="Measure*"
										placeholder="Ex. 1 cup, 2 tbs"
										variant="outlined"
									/>
								</Grid>
								{index > 0 && (
									<Grid item xs={12} sm={4}>
										<Button
											onClick={() => remove(index)}
											variant="contained"
										>
											Remove
										</Button>
									</Grid>
								)}
							</Grid>
						))}
					<Grid item xs={12}>
						<Button
							onClick={() => push({ name: '', measure: '' })}
							variant="contained"
							startIcon={<AddCircle />}
							disabled={!!errors.ingredients}
						>
							Add ingredient
						</Button>
					</Grid>
				</>
			)}
		</FieldArray>
	);
};

export default IngredientsSection;
