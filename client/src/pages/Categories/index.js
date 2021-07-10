import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Banner from '../../components/Banner';
import LoadingIndicator from '../../components/LoadingIndicator';
import CardGrid from '../../components/CardGrid';
import useRecipes from '../../hooks/useRecipes';

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2% auto',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2%',
    },
});

const Categories = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState('Categories');
    const { queryRecipeData } = useRecipes();
    const { data, isLoading, error } = queryRecipeData();

    if (error) {
        history.push('/');
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    const getData = (data) => {
        switch (selected) {
            case 'Categories':
                return data.categories;
            case 'Tags':
                return data.tags;
            case 'Areas':
                return data.areas;
            default:
                return [];
        }
    };

    return (
        <>
            <Banner
                title={selected}
                breadcrumbList={[
                    { title: 'Browse Recipes', path: 'recipes/search' },
                    { title: selected, path: 'categories' },
                ]}
            />
            <Container className={classes.buttonContainer}>
                <ButtonGroup
                    size="large"
                    color="secondary"
                    aria-label="recipe groups buttons"
                >
                    <Button onClick={() => setSelected('Categories')}>
                        Categories
                    </Button>
                    <Button onClick={() => setSelected('Tags')}>Tags</Button>
                    <Button onClick={() => setSelected('Areas')}>Areas</Button>
                </ButtonGroup>
            </Container>
            <Container className={classes.mainContainer}>
                <CardGrid items={getData(data)} type={selected} />
            </Container>
        </>
    );
};

export default Categories;
