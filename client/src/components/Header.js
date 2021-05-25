import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
// import SearchIcon from "@material-ui/icons/Search";

import SideDrawer from "./SideDrawer";
import HideOnScroll from "./HideOnScroll";
import BackToTop from "./BackToTop";

import useAuthUser from "../hooks/useAuthUser";
import chefHat from "../assets/chefHat.png";


const useStyles = makeStyles((theme) => ({
	navBarDisplayFlex: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		maxHeight: 50
	},
	navDisplayFlex: {
		display: "flex",
		justifyContent: "space-between",
	},
	linkText: {
		textDecoration: "none",
		textTransform: "uppercase",
		color: "#FFF"
	},
	logoContainer: {
		display: "inline-flex",
		justifyContent: "space-around",
		alignItems: "center",
		width: "25%",
		textDecoration: "none",
		textTransform: "uppercase",
		color: "white",
		opacity: 0.9,
		"&:hover": {
			opacity: 1
		},
	},
	logo: {
		width: "25%",
		height: "25%",
	},
	brandTitle: {
		fontFamily: "Courgette, cursive",
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.5em"
		},
		fontSize: "2em"
	},
	linkButton: {
		opacity: 0.8,
		marginRight: "2px",
		"&:hover": {
			opacity: 1
		},
	},
	search: {
		position: "relative",
		borderRadius: "3px",
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0,2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "white",
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));


const Header = () => {
	const classes = useStyles();
	const history = useHistory();
	const { logout, getAuthUser } = useAuthUser();
	const loggedInUser = getAuthUser();

	let navLinks = [];

	if (!loggedInUser) {
		navLinks = [...navLinks,
			{ title: "Login", path: "/login", icon: "exit_to_app" },
			{ title: "Register", path: "/register", icon: "person" }
		];
	} else {
		navLinks = [...navLinks,
			{ title: "My Profile", path: "/profile", icon: "person" },
			{ title: "Submit Recipe", path: "/submit", icon: "add_circle" },
		];
	}

	const handleLogout = () => {
		logout();
		history.push("/");
	};

	return (
		<>
			<HideOnScroll>
				<AppBar position="fixed">
					<Toolbar>
						<Container className={classes.navBarDisplayFlex}>
							<NavLink to="/" className={classes.logoContainer}>
								<Hidden smDown>
									<img className={classes.logo} src={chefHat} alt="logo"  />
								</Hidden>
								<Typography variant="h3" className={classes.brandTitle}>RECIPE APP</Typography>
							</NavLink>
							<Hidden smDown>
								<List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
									{navLinks.map(({ title, path, icon }) => (
										<NavLink to={path} key={title} className={classes.linkText}>
											<ListItem button className={classes.linkButton}>
												<Icon fontSize="small" style={{ marginRight: "2px" }}>{icon}</Icon>
												<ListItemText primary={title} />
											</ListItem>
										</NavLink>
									))}
									{loggedInUser && (
										<NavLink to="/" className={classes.linkText}>
											<ListItem button onClick={handleLogout} className={classes.linkButton}>
												<Icon fontSize="small" style={{ marginRight: "2px" }}>exit_to_app</Icon>
												<ListItemText primary="Logout" />
											</ListItem>
										</NavLink>
									)}
								</List>
							</Hidden>
							<Hidden mdUp>
								<SideDrawer navLinks={navLinks} isLoggedIn={loggedInUser ? true : false} handleLogout={handleLogout} />
							</Hidden>
						</Container>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar id="back-to-top-anchor" />
			<BackToTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUp />
				</Fab>
			</BackToTop>
		</>
	);
};

export default Header;