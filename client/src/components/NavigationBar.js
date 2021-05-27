import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
//import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles((theme) => ({
	navBarDisplayFlex: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		maxHeight: 50,
	},
	listItem: {
		textDecoration: "none"
	},
	linkButton: {
		"&:hover": {
			color: theme.palette.secondary.main
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

// home, recipes [category list, latest recipes, most liked recipes ], members, contact us, search
const NavigationBar = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<p>test in bar</p>
			<AppBar position="fixed">
				<Toolbar>
					<Container className={classes.navBarDisplayFlex}>
						<List component="nav" aria-labelledby="main navigation" style={{ display: "flex", justifyContent: "space-between" }}>
							<NavLink to="/" className={classes.listItem}>
								<ListItem button className={classes.linkButton}>
									<ListItemText>Home</ListItemText>
								</ListItem>
							</NavLink>
							<NavLink to="/members" className={classes.listItem}>
								<ListItem button className={classes.linkButton}>
									<ListItemText>Members</ListItemText>
								</ListItem>
							</NavLink>
							<ListItem button className={classes.linkButton} onClick={handleMenuClick}>
								<ListItemText>Recipes</ListItemText>
								<KeyboardArrowDownIcon fontSize="small" style={{ marginLeft: "2px", color: "#FFF" }} />
							</ListItem>
							<Menu
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<NavLink to="/categories" className={classes.listItem}>
									<MenuItem onClick={handleMenuClose}>Category List</MenuItem>
								</NavLink>
								<NavLink to="/recipes/search?sortBy=dateAdded" className={classes.listItem}>
									<MenuItem onClick={handleMenuClose}>Latest Recipes</MenuItem>
								</NavLink>
								<NavLink to="/recipes/search?sortBy=dateAdded" className={classes.listItem}>
									<MenuItem onClick={handleMenuClose}>Most Liked Recipes</MenuItem>
								</NavLink>
							</Menu>
							<NavLink to="/contact" className={classes.listItem}>
								<ListItem button className={classes.linkButton}>
									<ListItemText>Contact Us</ListItemText>
								</ListItem>
							</NavLink>
						</List>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search..."
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
							/>
						</div>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavigationBar;
