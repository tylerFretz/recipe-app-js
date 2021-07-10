import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    fullScreenContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1% 0%',
        borderTop: '1px dashed #999',
        borderBottom: '1px dashed #999',
        margin: '3% 0%',
    },
    mobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px dashed #999',
        borderBottom: '1px dashed #999',
        alignItems: 'center',
        margin: '5% 0%',
    },
});

const SectionTitle = ({ title }) => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        switch (title) {
            case 'Top Rated':
                history.push('/recipes/search?sortBy=upvoteCount');
                break;
            case 'Latest':
                history.push('/recipes/search?sortBy=dateAdded');
                break;
            default:
                break;
        }
    };

    const renderMobile = () => (
        <Container className={classes.mobileContainer}>
            <Typography variant="h5" style={{ margin: '5px 0' }}>
                {title} Recipes
            </Typography>
            <Button
                onClick={() => handleClick()}
                variant="contained"
                style={{ margin: '10px 0' }}
            >
                All {title} Recipes
            </Button>
        </Container>
    );

    if (isMobile) {
        return renderMobile();
    }

    return (
        <Container className={classes.fullScreenContainer}>
            <Typography variant="h5" style={{ margin: '5px 0' }}>
                {title} Recipes
            </Typography>
            <Button
                onClick={() => handleClick()}
                variant="contained"
                style={{ margin: '10px 0' }}
            >
                All {title} Recipes
            </Button>
        </Container>
    );
};

SectionTitle.propTypes = {
    title: Proptypes.oneOf(['Top Rated', 'Latest']).isRequired,
};

export default SectionTitle;
