import React from 'react';
import { Field, FieldArray } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';

const IngredientsSection = ({ values, errors }) => {
    return (
        <FieldArray name="ingredients">
            {({ remove, push }) => (
                <>
                    <Grid item xs={12} style={{ marginBottom: '2%' }}>
                        <Typography variant="h4">Ingredients</Typography>
                    </Grid>
                    {values.ingredients.length > 0 &&
                        values.ingredients.map((i, index) => (
                            <Grid container item xs={12} key={index}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    style={{ marginBottom: '2%' }}
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
                                    style={{ marginBottom: '2%' }}
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
                            startIcon={<AddCircleIcon />}
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
