import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import React from 'react';

import CardRow from './CardRow';

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row',
		},
	},
	rowContainer: {
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row',
		},
		margin: '2% 0%',
	},
}));

const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
		arr.slice(i * size, i * size + size)
	);

const CardGrid = ({ items, type, isSubmitted }) => {
	const classes = useStyles();
	const itemGroups = chunk(items, 3);

	return (
		<Grid container className={classes.mainContainer}>
			{itemGroups.map((group, i) => (
				<Grid
					container
					item
					xs={12}
					spacing={3}
					key={i}
					className={classes.rowContainer}
				>
					<CardRow items={group} type={type} isSubmitted={isSubmitted} />
				</Grid>
			))}
		</Grid>
	);
};

export default CardGrid;
