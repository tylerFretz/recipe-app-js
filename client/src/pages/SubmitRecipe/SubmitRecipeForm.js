import React from "react";
import { Form, Field, FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		display: "flex",
		flexDirection: "column"
	},
	feild: {
		width: "100%",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SubmitRecipeForm = ({ values, errors }) => {
	const classes = useStyles();

	return (
		<Form className={classes.form}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Field
						component={TextField}
						name="name"
						label="Recipe title"
						placeholder="Max 256 characters"
						variant="outlined"
						required
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={6}>
					<Field
						component={TextField}
						name="category"
						label="Recipe category"
						placeholder="Ex. Vegetarian, Seafood, Dessert, etc..."
						variant="outlined"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={6}>
					<Field
						component={TextField}
						name="area"
						label="Recipe area"
						placeholder="Ex. British, French, Chinese, etc..."
						variant="outlined"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						component={TextField}
						name="instructions"
						label="Recipe Instructions"
						placeholder="Put each step on its own line."
						variant="outlined"
						multiline={true}
						rows={4}
						required
						className={classes.feild}
					/>
				</Grid>
				<FieldArray name="ingredients">
					{({ remove, push }) => (
						<>
							{values.ingredients.length > 0 &&
								values.ingredients.map((i, index) => (
									<Grid container item xs={12} key={index}>
										<Grid item xs={4}>
											<Field
												component={TextField}
												name={`ingredients.${index}.name`}
												placeholder="Ingredient name"
												label="Ingredient name"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={3}>
											<Field
												component={TextField}
												name={`ingredients.${index}.measure`}
												placeholder="Measure"
												label="Ingredient Measure"
												variant="outlined"
											/>
										</Grid>
										{index > 0 && (
											<Grid item xs={2}>
												<Button onClick={() => remove(index)} variant="contained">
													Remove
												</Button>
											</Grid>
										)}
									</Grid>
								))}
							<Grid item xs={12}>
								<Button
									onClick={() => push({ name: "", measure: "" })}
									variant="contained"
									startIcon={<AddCircleIcon />}
									// disabled={errors.ingredients}
								>
									Add another ingredient
								</Button>
							</Grid>
						</>
					)}
				</FieldArray>
				<FieldArray name="tags">
					{({ remove, push }) => (
						<>
							{values.tags.length > 0 &&
								values.tags.map((tag, index) => (
									<Grid container item xs={12} key={index}>
										<Grid item xs={4}>
											<Field
												component={TextField}
												name={`tags.${index}`}
												placeholder="Tag name"
												label="Tag name"
												variant="outlined"
											/>
										</Grid>
										{index > 0 && (
											<Grid item xs={2}>
												<Button onClick={() => remove(index)} variant="contained">
													Remove
												</Button>
											</Grid>
										)}
									</Grid>
								))}
							<Grid item xs={12}>
								<Button
									onClick={() => push("")}
									variant="contained"
									startIcon={<AddCircleIcon />}
									disabled={errors.tags}
								>
									Add Tag
								</Button>
							</Grid>
						</>
					)}
				</FieldArray>
				<Grid item xs={6}>
					<Field
						component={TextField}
						name="thumbImageUrl"
						label="Image url"
						variant="outlined"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={6}>
					<Field
						component={TextField}
						name="youtubeUrl"
						label="Youtube Url"
						variant="outlined"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						component={TextField}
						name="sourceUrl"
						label="Source Url"
						variant="outlined"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						component={TextField}
						name="summary"
						label="Recipe Summary"
						placeholder="Max 256 characters."
						variant="outlined"
						multiline={true}
						rows={3}
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={4}>
					<Field
						component={TextField}
						name="prepTime"
						label="Prep Time"
						placeholder="Ex. 15 min, 1.5 hours..."
						variant="outlined"
						type="number"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={4}>
					<Field
						component={TextField}
						name="cookTime"
						label="Cook Time"
						placeholder="Ex. 15 min, 1.5 hours..."
						variant="outlined"
						type="number"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={4}>
					<Field
						component={TextField}
						name="servings"
						label="Servings"
						variant="outlined"
						type="number"
						className={classes.feild}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Save Recipe
					</Button>
				</Grid>
			</Grid>
			<pre>{JSON.stringify(values, null, 2)}</pre>
			<pre>{JSON.stringify(errors, null, 2)}</pre>
		</Form>
	);
};

export default SubmitRecipeForm;