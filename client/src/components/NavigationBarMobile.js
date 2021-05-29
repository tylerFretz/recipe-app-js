import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import useAuthUser from "../hooks/useAuthUser";

const useStyles = makeStyles((theme) => ({
	listItem: {
		display: "flex",
		textDecoration: "none",
		color: theme.palette.darkGrey.main,
	},
	navButtonMobileContainer: {
		background: "#FFF",
		borderTop: "1px solid #676767",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		top: 0,
		zIndex: 6
	},
}));

const NavigationBarMobile = () => {
	const classes = useStyles();
	const [menuOpen, setMenuOpen] = useState(false);
	const { getAuthUser } = useAuthUser();
	const loggedInUser = getAuthUser();
	const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

	const toggleDrawer = () => event => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setMenuOpen(!menuOpen);
	};

	const list = () => (
		<div
			role="presentation"
			onClick={toggleDrawer()}
			onKeyDown={toggleDrawer()}
		>
			<List aria-labelledby="main navigation">
				<ListItem button>
					<NavLink to="/" className={classes.listItem}>
						<Icon style={{ marginRight: "5px" }}>home</Icon>
						<ListItemText>Home</ListItemText>
					</NavLink>
				</ListItem>
				<Divider />
				<ListItem>
					<NavLink to="/members" className={classes.listItem}>
						<Icon style={{ marginRight: "5px" }}>people</Icon>
						<ListItemText>Members</ListItemText>
					</NavLink>
				</ListItem>
				<Divider />
				<ListItem>
					<NavLink to="/recipes/search" className={classes.listItem}>
						<Icon style={{ marginRight: "5px" }}>emoji_food_beverage</Icon>
						<ListItemText>Browse Recipes</ListItemText>
					</NavLink>
				</ListItem>
				<Divider />
				{Boolean(loggedInUser) && (
					<>
						<ListItem>
							<NavLink to="/submit" className={classes.listItem}>
								<Icon style={{ marginRight: "5px" }}>add_circle</Icon>
								<ListItemText>Submit Recipe</ListItemText>
							</NavLink>
						</ListItem>
						<Divider />
					</>
				)}
				<ListItem>
					<NavLink to="/contact" className={classes.listItem}>
						<Icon style={{ marginRight: "5px" }}>email</Icon>
						<ListItemText>Contact</ListItemText>
					</NavLink>
				</ListItem>
			</List>
		</div>
	);

	return (
		<>
			<div className={classes.navButtonMobileContainer}>
				<IconButton aria-label="menu" onClick={toggleDrawer()}>
					{menuOpen
						? <Icon fontSize="large">close</Icon>
						: <Icon fontSize="large">menu</Icon>
					}
				</IconButton>
			</div>
			<SwipeableDrawer
				anchor="top"
				open={menuOpen}
				onClose={toggleDrawer()}
				onOpen={toggleDrawer()}
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
			>
				{list()}
			</SwipeableDrawer>
		</>
	);
};

export default NavigationBarMobile;