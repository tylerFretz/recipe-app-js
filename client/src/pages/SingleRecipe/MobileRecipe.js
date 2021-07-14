import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import RecipeMediaMobile from './RecipeMediaMobile';
import ContentInnerMobile from './ContentInnerMobile';
import RecipeFullStats from './RecipeFullStats';
import RelatedSideBar from './RelatedSideBar';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const useStyles = makeStyles({
	mobileContainer: {
		width: '100%',
		padding: 0,
		marginBottom: '10%',
	},
	sectionContainer: {
		position: 'relative',
		minHeight: '1px',
		margin: '10% 0%',
	},
	mainContentContainer: {
		position: 'relative',
		background: '#FFF',
		overflow: 'hidden',
		borderRadius: '3px',
		padding: 0,
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
	commentSection: {
		maxWidth: 360,
		padding: '5%',
		background: '#FFF',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
		borderRadius: '3px',
	}
});

const MobileRecipe = ({ recipe, handleVote, handleAddComment, handleSave }) => {
	const classes = useStyles();
	const commentRef = useRef(null);

	const executeCommentScroll = () => commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

	return (
		<Container className={classes.mobileContainer}>
			<Container className={classes.sectionContainer}>
				<Container className={classes.mainContentContainer}>
					<RecipeMediaMobile
						thumbImageUrl={recipe.thumbImageUrl}
						youtubeUrl={recipe.youtubeUrl}
						name={recipe.name}
						commentsLength={recipe.comments.length}
						upvoteCount={recipe.upvoteCount}
						handleVote={handleVote}
						handleSave={handleSave}
						handleAddComment={handleAddComment}
						executeCommentScroll={executeCommentScroll}
					/>
					<ContentInnerMobile
						name={recipe.name}
						summary={recipe.summary}
						ingredients={recipe.ingredients}
						instructions={recipe.instructions}
					/>
				</Container>
			</Container>
			<Container className={classes.sectionContainer}>
				<RecipeFullStats recipe={recipe} />
			</Container>
			<Container className={classes.sectionContainer}>
				<RelatedSideBar category={recipe.category} />
			</Container>
			<Container className={classes.commentSection} ref={commentRef}>
				<CommentList comments={recipe.comments} />
				<CommentForm handleAddComment={handleAddComment} />
			</Container>
		</Container>
	);
};

export default MobileRecipe;
