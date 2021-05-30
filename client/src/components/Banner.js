import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import banner from "../assets/banner.jpg";

const useStyles = makeStyles((theme) => ({
	bannerContainer: {
		backgroundColor: "#28292b",
		position: "relative",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		padding: "0% 5%"
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundImage: `url(${banner})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		opacity: 0.3
	},
	titleContainer: {
		paddingTop: "5%",
		paddingBottom: "2%"
	},
	title: {
		fontWeight: 800,
		color: "#FFF",
		position: "relative",
		zIndex: 5,
	},
	breadcrumbContainer: {
		zIndex: 5,
		listStyle: "none",
		position: "relative",
		alignSelf: "flex-end",
		background: theme.palette.secondary.main,
		borderTopLeftRadius: "5px",
		borderTopRightRadius: "5px",
		margin: 0,
		padding: "1% 1%"
	},
	breadcrumbText: {
		color: "#FFF",
		fontWeight: 500,
		margin: 0,
		padding: "0px 2px",
		display: "inline",
		textDecoration: "none"
	}
}));

const Banner = ({ title, breadcrumbList }) => {
	const classes = useStyles();

	return (
		<div className={classes.bannerContainer}>
			<div className={classes.titleContainer}>
				<Typography className={classes.title} variant="h2">{title}</Typography>
			</div>
			<ul className={classes.breadcrumbContainer}>
				<li className={classes.breadcrumbText}>
					<a href="/" className={classes.breadcrumbText}>Home</a>
				</li>
				{breadcrumbList.map((item, i) => (
					<>
						<li className={classes.breadcrumbText}>/</li>
						<li className={classes.breadcrumbText} key={i}>
							<a href={`/${item.path}`} className={classes.breadcrumbText}>{item.title}</a>
						</li>
					</>
				))}
			</ul>
			<div className={classes.overlay} />
		</div>
	);
};

export default Banner;