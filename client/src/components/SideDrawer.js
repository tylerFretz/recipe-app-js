import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
	list: {
		width: 200,
	},
	linkText: {
		textDecoration: "none",
		textTransform: "uppercase",
		color: "black",
	},
});

const SideDrawer = ({ navLinks, isLoggedIn, handleLogout }) => {
	const [state, setState] = useState({ right: false });
	const classes = useStyles();

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setState({ [anchor]: open });
	};

	const sideDrawerList = anchor => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List component="nav">
				{navLinks.map(({ title, path }) => (
					<NavLink to={path} key={title} className={classes.linkText}>
						<ListItem button>
							<ListItemText primary={title} />
						</ListItem>
					</NavLink>
				))}
				{isLoggedIn && (
					<NavLink to="/" className={classes.linkText}>
						<ListItem button onClick={handleLogout} className={classes.linkButton}>
							<ListItemText primary="Logout" />
						</ListItem>
					</NavLink>
				)}
			</List>
		</div>
	);

	return (
		<>
			<IconButton edge="start" aria-label="menu" onClick={toggleDrawer("right", true)}>
				<Menu fontSize="large" style={{ color: "white " }}/>
			</IconButton>
			<Drawer
				anchor="right"
				open={state.right}
				onClose={toggleDrawer("right", false)}
			>
				{sideDrawerList("right")}
			</Drawer>
		</>
	);
};

export default SideDrawer;