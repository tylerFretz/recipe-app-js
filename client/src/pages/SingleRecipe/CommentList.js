import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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