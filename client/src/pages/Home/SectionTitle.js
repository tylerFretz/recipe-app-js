/* eslint-disable indent */
import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
