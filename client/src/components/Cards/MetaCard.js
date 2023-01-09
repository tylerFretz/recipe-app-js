/* eslint-disable indent */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import tileBackground from '../../assets/tileBackground.png';

const useStyles = makeStyles({
	card: {
		height: '100%',
		backgroundColor: '#FBAB7E',
		backgroundImage: `url(${tileBackground})`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		padding: '10% 10%',
		color: '#FFF',
	},
});

const getPath = (title, type) => {
	switch (type) {
		case 'Tags':
			return `recipes/search?tag=${title}`;
		case 'Categories':
			return `recipes/search?category=${title}`;
		case 'Areas':
			return `recipes/search?area=${title}`;
		default:
			return '/';
	}
};

const MetaCard = ({ title, type }) => {
	const classes = useStyles();
	const path = getPath(title, type);
	if (!path) return null;

	return (
		<NavLink to={path} style={{ textDecoration: 'none', width: '100%' }}>
			<Paper className={classes.card} elevation={3}>
				<Typography className={classes.text} variant="h3">
					{title}
				</Typography>
			</Paper>
		</NavLink>
	);
};

export default MetaCard;
