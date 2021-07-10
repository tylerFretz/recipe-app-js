import React from 'react';
import { v4 as uuid } from 'uuid';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const RecipeStats = ({ stats, variant }) => {
	let totalTime = '';
	stats.prepTime && stats.cookTime
		? (totalTime = Number(stats.prepTime) + Number(stats.cookTime))
		: (totalTime = '?');

	if (!stats.servings) {
		stats.servings = '?';
	}

	const recipeStats = [
		{ value: stats.upvoteCount, tooltipText: 'Upvotes', icon: 'thumb_up' },
		{
			value: totalTime,
			tooltipText: 'Prep time + cook time',
			icon: 'schedule',
		},
		{ value: stats.servings, tooltipText: 'Servings', icon: 'people' },
	];

	return (
		<Container
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				padding: '1% 5%',
			}}
		>
			{recipeStats.map((item) => (
				<Tooltip key={uuid()} title={item.tooltipText}>
					<Container
						style={{
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<Icon>{item.icon}</Icon>
						<Typography variant={variant}>{item.value}</Typography>
					</Container>
				</Tooltip>
			))}
		</Container>
	);
};

export default RecipeStats;
