import React from 'react';
import { format } from 'date-fns';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
	root: {
		paddingBottom: '2%'
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 500
	},
	commentAuthor: {
		fontWeight: 700
	}
});

const CommentList = ({ comments }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography className={classes.title}>Join the Conversation</Typography>
			<List>
				{comments.map((comment) => (
					<>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								<Avatar alt={comment.user.username} src={comment.user.avatarImageUrl} />
							</ListItemAvatar>
							<ListItemText
								primary={<Typography className={classes.commentAuthor}>{comment.user.username}</Typography>}
								secondary={
									<>
										<Typography style={{ fontSize: '.75rem' }}>
											{format(new Date(comment.dateAdded), 'MMMM dd, yyyy h:mm aaa')}
										</Typography>
										<Typography>{comment.commentText}</Typography>
									</>
								}
							/>
						</ListItem>
						<Divider variant='inset' component='li' />
					</>
				))}
			</List>
		</div>
	);
};

export default CommentList;