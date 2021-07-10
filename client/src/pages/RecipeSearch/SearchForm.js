import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field, Formik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { Select, TextField } from 'formik-material-ui';

import useRecipes from '../../hooks/useRecipes';
import LoadingIndicator from '../../components/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
    },
    feild: {
        width: '100%',
    },
    label: {
        marginLeft: '5%',
    },
    submit: {
        width: '100%',
        height: '100%',
        color: '#FFF',
    },
}));

const initialValues = {
    name: '',
    category: '',
    area: '',
    tag: '',
    sortBy: '',
};

const getUrlParms = (values) => {
    return Object.entries(values)
        .filter(([, value]) => !!value)
        .map(([key, value]) => `${key}=${value}`)
        .join('');
};

const SearchForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const { queryRecipeData } = useRecipes();
    const { data: recipesData, isLoading } = queryRecipeData();

    const onSubmit = (values) => {
        const params = getUrlParms(values);
        history.push(`/recipes/search?${params}`);
    };

    return isLoading ? (
        <LoadingIndicator />
    ) : (
        <Container style={{ marginTop: '2%' }}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.feild}>
                                <InputLabel
                                    id="category-search-select-label"
                                    className={classes.label}
                                >
                                    Category
                                </InputLabel>
                                <Field
                                    component={Select}
                                    name="category"
                                    variant="filled"
                                    labelId="category-search-select-label"
                                >
                                    {recipesData.categories.map((category) => (
                                        <MenuItem
                                            key={category}
                                            value={`${category}&`}
                                        >
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.feild}>
                                <InputLabel
                                    id="tag-search-select-label"
                                    className={classes.label}
                                >
                                    Tag
                                </InputLabel>
                                <Field
                                    component={Select}
                                    name="tag"
                                    variant="filled"
                                    labelId="tag-search-select-label"
                                >
                                    {recipesData.tags.map((tag) => (
                                        <MenuItem key={tag} value={`${tag}&`}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.feild}>
                                <InputLabel
                                    id="area-search-select-label"
                                    className={classes.label}
                                >
                                    Area
                                </InputLabel>
                                <Field
                                    component={Select}
                                    name="area"
                                    variant="filled"
                                    labelId="area-search-select-label"
                                >
                                    {recipesData.areas.map((area) => (
                                        <MenuItem key={area} value={`${area}&`}>
                                            {area}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="name"
                                variant="outlined"
                                placeholder="Find a recipe..."
                                className={classes.feild}
                            />
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <FormControl className={classes.feild}>
                                <InputLabel
                                    id="sortBy-search-select-label"
                                    className={classes.label}
                                >
                                    Sort by
                                </InputLabel>
                                <Field
                                    component={Select}
                                    name="sortBy"
                                    variant="filled"
                                    labelId="sortBy-search-select-label"
                                >
                                    <MenuItem value="dateAdded&order=desc">
                                        Newest first
                                    </MenuItem>
                                    <MenuItem value="dateAdded&order=asc">
                                        Oldest first
                                    </MenuItem>
                                    <MenuItem value="upvoteCount&order=desc">
                                        Most popular
                                    </MenuItem>
                                    <MenuItem value="upvoteCount&order=asc">
                                        Least popular
                                    </MenuItem>
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                startIcon={<SearchIcon />}
                                className={classes.submit}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Container>
    );
};

export default SearchForm;
