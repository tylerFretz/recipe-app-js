import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import FavoriteIcon from '@material-ui/icons/Favorite';

import noVideo from '../../assets/noVideo.jpg';

const useStyles = makeStyles({
	mainContainer: {
		borderRadius: '3px 3px 0px 0px',
		overflow: 'hidden',
		position: 'relative',
	},
	mediaContainer: {
		padding: 0,
		margin: 0,
		border: 'none',
	},
	tabList: {
		marginTop: '5%',
		display: 'flex',
		justifyContent: 'center',
	},
	embededResponsive16by9: {
		position: 'relative',
		display: 'block',
		height: 0,
		overflow: 'hidden',
		paddingBottom: '56.25%',
	},
	embededResponsiveItem: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	metaCount: {
		display: 'flex',
		background: '#edeaea',
		justifyContent: 'space-around',
		marginTop: '5%',
		width: '80%',
		borderRadius: '5px'
	}
});

const RecipeMediaMobile = ({
	youtubeUrl,
	thumbImageUrl,
	name,
	commentsLength,
	upvoteCount,
	handleSave,
	handleVote,
	executeCommentScroll
}) => {
	const classes = useStyles();
	const [mediaUrl, setMediaUrl] = useState(thumbImageUrl);

	// theMealDb provides the full youtube url. We just need the last section (the id)
	const videoId = youtubeUrl
		? youtubeUrl.substring(youtubeUrl.lastIndexOf('=') + 1)
		: noVideo;

	return (
		<>
			<Container className={classes.mediaContainer}>
				{mediaUrl === thumbImageUrl ? (
					<Container className={classes.embededResponsive16by9}>
						<img
							className={classes.embededResponsiveItem}
							src={thumbImageUrl}
							alt={`Image of ${name}`}
							title={name}
						/>
					</Container>
				) : youtubeUrl ? (
					<Container className={classes.embededResponsive16by9}>
						<iframe
							className={classes.embededResponsiveItem}
							src={`https://www.youtube.com/embed/${videoId}`}
							allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</Container>
				) : (
					<Container className={classes.embededResponsive16by9}>
						<img
							className={classes.embededResponsiveItem}
							src={noVideo}
							alt="No image available"
						/>
					</Container>
				)}
			</Container>
			<Container className={classes.tabList}>
				<ButtonGroup
					size="large"
					variant="contained"
					aria-label="Media options"
				>
					<Button onClick={() => setMediaUrl(thumbImageUrl)}>
						Image
					</Button>
					<Button onClick={() => setMediaUrl(videoId)}>Video</Button>
				</ButtonGroup>
			</Container>
			<Container className={classes.metaCount}>
				<div>
					<IconButton onClick={() => handleSave()} color='secondary'>
						<FavoriteIcon />
					</IconButton>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
					<IconButton onClick={() => handleVote()} color='secondary'>
						<ThumbUpAltIcon />
					</IconButton>
					<Typography>{upvoteCount}</Typography>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
					<IconButton onClick={() => executeCommentScroll()} color='secondary'>
						<ModeCommentIcon />
					</IconButton>
					<Typography>{commentsLength}</Typography>
				</div>
			</Container>
		</>
	);
};

export default RecipeMediaMobile;
