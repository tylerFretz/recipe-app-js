import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ToggleableList from '../../components/ToggleableList';

const useStyles = makeStyles({
    contentContainer: {
        padding: '5%',
        marginTop: '5%',
    },
    listContainer: {
        padding: 0,
        marginTop: '8%',
    },
});

const ContentInnerMobile = ({ name, summary, ingredients, instructions }) => {
    const classes = useStyles();

    const ingredientValues = ingredients.map((i) => i.measure + ' ' + i.name);

    // some of the recipes from theMealDb have numbered steps and some don't. Let's just get rid of them
    instructions = instructions
        .replace(/\d\./g, '')
        .replace(/(STEP\s+\d+)/gim, '');

    // instructions from theMealDb come as a long string with occaisional linebreaks. Let's split that into steps
    const instructionsArray = instructions
        .split(/\r?\n/)
        .filter((instruction) => instruction !== '')
        .filter((instruction) => instruction.length > 1);

    return (
        <Container className={classes.contentContainer}>
            <Typography
                variant="h2"
                gutterBottom={true}
                style={{ fontFamily: 'Londrina' }}
            >
                {name}
            </Typography>
            <Typography variant="body1">{summary}</Typography>
            <hr />
            <Container className={classes.listContainer}>
                <Typography variant="h4" gutterBottom={true}>
                    Ingredients
                </Typography>
                <ToggleableList items={ingredientValues} isNumbered={false} />
            </Container>
            <Container className={classes.listContainer}>
                <Typography variant="h4" gutterBottom={true}>
                    Instructions
                </Typography>
                <ToggleableList items={instructionsArray} isNumbered={true} />
            </Container>
        </Container>
    );
};

export default ContentInnerMobile;
