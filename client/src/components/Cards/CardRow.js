import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import MetaCard from './MetaCard';
import RecipeCard from './RecipeCard';

const CardRow = ({ items, type, isSubmitted }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (type === 'recipes' || type === 'profile') ? (
		<Grid
			container
			spacing={3}
			style={{ flexDirection: isMobile ? 'column' : 'row' }}
		>
			{items.map((recipe) => (
				<Grid
					container
					item
					xs={isMobile ? 12 : 4}
					key={recipe.id}
					style={{ justifyContent: 'center' }}
				>
					<RecipeCard recipe={recipe} type={type} isSubmitted={isSubmitted} />
				</Grid>
			))}
		</Grid>
	) : (
		<Grid
			container
			spacing={3}
			style={{ flexDirection: isMobile ? 'column' : 'row' }}
		>
			{items.map((item, i) => (
				<Grid
					container
					item
					xs={isMobile ? 12 : 4}
					key={i}
					style={{ justifyContent: 'center' }}
				>
					<MetaCard title={item} type={type} />
				</Grid>
			))}
		</Grid>
	);
};

export default CardRow;
