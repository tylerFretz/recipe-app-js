import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	videoContainer: {
		position: 'relative',
		paddingBottom: '56.25%', //16:9
		paddingTop: 25,
		height: 0,
	},
	title: {
		variant: 'h3',
		fontSize: '1.75rem',
		fontWeight: 500,
		marginBottom: '3%',
	},
	player: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
});

const YouTubePlayer = ({ youtubeUrl }) => {
	const classes = useStyles();

	// theMealDb provides the full youtube url. We just need the last section (the id)
	const videoId = youtubeUrl.substring(youtubeUrl.lastIndexOf('=') + 1);

	return (
		<Container>
			<Typography className={classes.title}>Video</Typography>
			<Container className={classes.videoContainer}>
				<iframe
					width="853"
					height="480"
					className={classes.player}
					src={`https://www.youtube.com/embed/${videoId}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</Container>
		</Container>
	);
};

YouTubePlayer.propTypes = {
	youtubeUrl: PropTypes.string,
};

export default YouTubePlayer;
