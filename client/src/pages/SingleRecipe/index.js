import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LoadingIndicator from '../../components/LoadingIndicator';
import FullScreenRecipe from './FullScreenRecipe';
import MobileRecipe from './MobileRecipe';
import useRecipes from '../../hooks/useRecipes';
import useUsers from '../../hooks/useUsers';

const SingleRecipe = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { id } = useParams();
	const { getRecipeById, upvoteRecipe, addComment } = useRecipes();
	const { saveRecipe } = useUsers();
	const { data: recipe, isLoading, error } = getRecipeById(id);


	if (isLoading || !recipe) return <LoadingIndicator />;

	if (error) return <div>404: Recipe not found</div>;

	const handleVote = () => upvoteRecipe(id);

	const handleAddComment = (comment) => addComment(id, comment);

	const handleSave = () => saveRecipe(id);

	return isMobile ? (
		<MobileRecipe
			recipe={recipe}
			handleVote={handleVote}
			handleAddComment={handleAddComment}
			handleSave={handleSave}
		/>
	) : (
		<FullScreenRecipe
			recipe={recipe}
			handleVote={handleVote}
			handleAddComment={handleAddComment}
			handleSave={handleSave}
		/>
	);
};

export default SingleRecipe;
