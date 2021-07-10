import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LoadingIndicator from '../../components/LoadingIndicator';
import FullScreenRecipe from './FullScreenRecipe';
import MobileRecipe from './MobileRecipe';
import useRecipes from '../../hooks/useRecipes';

const SingleRecipe = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();
    const { getRecipeById, upvoteRecipe, addComment } = useRecipes();
    const { data: recipe, isLoading, error } = getRecipeById(id);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div>404: Recipe not found</div>;
    }

    const handleVote = () => {
        upvoteRecipe(id);
    };

    const handleAddComment = (comment) => {
        addComment(id, comment);
    };

    return isMobile ? (
        <MobileRecipe
            recipe={recipe}
            handleVote={handleVote}
            handleAddComment={handleAddComment}
        />
    ) : (
        <FullScreenRecipe
            recipe={recipe}
            handleVote={handleVote}
            handleAddComment={handleAddComment}
        />
    );
};

export default SingleRecipe;
