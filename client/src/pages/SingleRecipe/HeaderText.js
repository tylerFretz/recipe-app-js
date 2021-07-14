import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '47%',
	},
	meta: {
		display: 'inline-flex',
		padding: 0,
		letterSpacing: 0,
		fontWeight: 400,
	},
	metaCount: {
		display: 'inline-flex',
		width: '40%',
		padding: 0,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	postDate: {
		marginRight: '2%',
	},
	breadCrumb: {
		'&:hover': {
			color: theme.palette.secondary.main
		}
	},
	title: {
		variant: 'h2',
		marginTop: '2%',
		marginBottom: '2%',
		fontWeight: 500,
		fontSize: '2.25rem',
	},
	summaryContainer: {
		display: 'flex',
		alignItems: 'center',
		padding: 0,
		marginTop: '4%',
		marginBottom: '2%',
	},
	summaryLabel: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '90px',
		height: '90px',
		marginRight: '5%',
		backgroundColor: '#000',
		color: '#FFF',
		textTransform: 'uppercase',
		fontWeight: 600,
		textAlign: 'center',
		borderRadius: '50%',
		textDecoration: 'none',
		'&:hover': {
			backgroundColor: '#606060',
		},
	},
	summary: {
		width: '80%',
		fontWeight: 400,
		fontSize: '1.125rem',
		lineHeight: '1.35',
	},
	tagContainer: {
		display: 'inline-flex',
		letterSpacing: 0,
		fontWeight: 500,
		marginTop: '5%',
		padding: '4%',
		backgroundColor: '#FFF',
		borderRadius: '3px',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
	tag: {
		color: 'white',
		backgroundColor: theme.palette.secondary.main,
	},
}));

const HeaderText = ({ recipe, handleVote, handleSave, executeCommentScroll }) => {
	const classes = useStyles();
	const formattedDate = format(new Date(recipe.dateAdded), 'MMMM dd, yyyy');

	if (!recipe.comments) recipe.comments = [];

	return (
		<Container className={classes.root}>
			<Container className={classes.meta}>
				<Typography className={classes.postDate}>
					{formattedDate}
					{' //'}
				</Typography>
				<Breadcrumbs separator="/" aria-label="breadcrumb">
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Typography className={classes.breadCrumb}>Home</Typography>
					</Link>
					<Link
						to={`/recipes/search?category=${recipe.category}`}
						style={{ textDecoration: 'none' }}
					>
						<Typography className={classes.breadCrumb}>{recipe.category}</Typography>
					</Link>
				</Breadcrumbs>
			</Container>
			<Typography className={classes.title}>{recipe.name}</Typography>
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
					<Typography>{recipe.upvoteCount}</Typography>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
					<IconButton onClick={() => executeCommentScroll()} color='secondary'>
						<ModeCommentIcon />
					</IconButton>
					<Typography>{recipe.comments.length}</Typography>
				</div>
			</Container>
			<Container className={classes.summaryContainer}>
				<Link
					to={{
						pathname: `/users/${recipe.user.id}`,
						state: { page: 'submitted' }
					}}
					className={classes.summaryLabel}
					title="view user's page"
				>
					<span>From {recipe.user.username}</span>
				</Link>
				<Typography className={classes.summary}>
					{recipe.summary}
				</Typography>
			</Container>
			<Divider />
			{recipe.tags.length > 0 && (
				<Container className={classes.tagContainer}>
					<Typography variant="h6" style={{ marginRight: '2%' }}>
						Tags:
					</Typography>
					{recipe.tags.map((tag) => (
						<Link
							key={tag}
							to={`/recipes/search?tag=${tag}`}
							style={{
								display: 'flex',
								margin: '0% 1%',
								alignItems: 'center',
								textDecoration: 'none',
							}}
						>
							<Chip
								label={tag}
								className={classes.tag}
								clickable={true}
								size="small"
							/>
						</Link>
					))}
				</Container>
			)}
		</Container>
	);
};

export default HeaderText;
