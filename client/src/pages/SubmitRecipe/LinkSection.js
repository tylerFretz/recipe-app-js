import React from 'react';
import { Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const LinkSection = ({ errors, values }) => (
    <>
        <Grid item xs={12} style={{ marginBottom: '2%' }}>
            <Typography variant="h4">Add Links (Optional)</Typography>
        </Grid>
        <Grid item xs={12}>
            <Field
                component={FormikTextField}
                name="thumbImageUrl"
                label="Image url"
                variant="outlined"
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
            <Field
                component={FormikTextField}
                name="youtubeUrl"
                label="Youtube Url"
                variant="outlined"
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
            <Field
                component={FormikTextField}
                name="sourceUrl"
                label="Source Url"
                variant="outlined"
                fullWidth
            />
        </Grid>
        <Grid item xs={12}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!Object.entries(errors).length === 0}
            >
                Save Recipe
            </Button>
        </Grid>
        {Object.entries(errors).length > 0 && (
            <>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </>
        )}
    </>
);

export default LinkSection;
