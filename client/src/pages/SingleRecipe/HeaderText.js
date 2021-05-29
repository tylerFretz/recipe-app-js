import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
	root: {
		width: "47%",
	},
	meta: {
		display: "inline-flex",
		padding: 0,
		letterSpacing: 0,
		fontWeight: 400,
	},
	metaCount: {
		display: "inline-flex",
		width: "40%",
		padding: 0,
		justifyContent: "flex-start",
	},
	postDate: {
		marginRight: "2%",
	},
	breadCrumb: {
		marginRight: "5%",
		fontWeight: 500,
		textDecoration: "none",
	},
	title: {
		variant: "h2",
		marginTop: "2%",
		marginBottom: "3%",
		fontWeight: 500,
		fontSize: "2.25rem",
	},
	summaryContainer: {
		display: "flex",
		alignItems: "center",
		padding: 0,
		marginTop: "4%",
		marginBottom: "2%",
	},
	summaryLabel: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		width: "90px",
		height: "90px",
		marginRight: "3%",
		marginLeft: 0,
		backgroundColor: "black",
		color: "white",
		textTransform: "uppercase",
		fontWeight: 600,
		textAlign: "center",
		borderRadius: "50%",
		float: "none"
	},
	summary: {
		width: "80%",
		fontWeight: 400,
		fontSize: "1.125rem",
		lineHeight: "1.35",
	},
	tagContainer: {
		display: "inline-flex",
		padding: 0,
		letterSpacing: 0,
		fontWeight: 500,
		marginTop: "2%",
	},
	tag: {
		color: "white",
		backgroundColor: "red",
	}
});

const HeaderText = ({ category, name, upvoteCount, comments, summary, dateAdded, user, tags }) => {
	const classes = useStyles();
	const formattedDate = format( new Date(dateAdded), "MMMM dd, yyyy");

	if (!comments) comments = [];

	return (
		<Container className={classes.root}>
			<Container className={classes.meta}>
				<Typography className={classes.postDate}>{formattedDate}{" //"}</Typography>
				<Breadcrumbs separator="/" aria-label="breadcrumb">
					<NavLink to="/" style={{ textDecoration: "none" }}>
						<Typography>Home</Typography>
					</NavLink>
					<NavLink to={`/recipes/search?category=${category}`} style={{ textDecoration: "none" }}>
						<Typography>{category}</Typography>
					</NavLink>
				</Breadcrumbs>
			</Container>
			<Typography className={classes.title}>{name}</Typography>
			<Container className={classes.metaCount}>
				<Container style={{ display: "flex", padding: 0 }}>
					<ThumbUpAltIcon />
					<Typography>{upvoteCount}</Typography>
				</Container>
				<Container style={{ display: "flex", padding: 0 }}>
					<ModeCommentIcon />
					<Typography>{comments.length}</Typography>
				</Container>
			</Container>
			<Container className={classes.summaryContainer}>
				<Container className={classes.summaryLabel}>
					{user && (
						<span>From {user.username}</span>
					)}
					{!user && (
						<span>From Recipe App</span>
					)}
				</Container>
				<Typography className={classes.summary}>{summary}</Typography>
			</Container>
			<Divider />
			{tags.length > 0 && (
				<Container className={classes.tagContainer}>
					<Typography style={{ marginRight: "2%" }}>Tags:</Typography>
					{tags.map(tag => (
						<NavLink key={tag} to={`/recipes/search?tag=${tag}`} style={{ margin: "0% 1%" }}>
							<Chip label={tag} className={classes.tag} clickable={true} size="small" />
						</NavLink>
					))}
				</Container>
			)}
		</Container>
	);
};

HeaderText.propTypes = {
	category: PropTypes.string,
	name: PropTypes.string,
	upvotes: PropTypes.number,
	comments: PropTypes.array,
	summary: PropTypes.string,
	dateAdded: PropTypes.string,
	tags: PropTypes.array,
};

export default HeaderText;
