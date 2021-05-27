import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
		position: "sticky",
		top: 0,
		alignSelf: "center",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		maxHeight: 50,
		background: "#FFF",
		margin: 0,
		width: "100vw",
		zIndex: 1
	},
	listItem: {
		textDecoration: "none",
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
		border: "2px solid #D3D3D3",
		borderRadius: theme.shape.borderRadius,
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
				border: "2px solid  #87adf3",
			},
		},
	},
}));

// home, recipes [category list, latest recipes, most liked recipes ], members, contact us, search
const NavigationBar = () => {
	const classes = useStyles();
	const history = useHistory();
	const [searchValue, setSearchValue] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSearch = (event) => {
		if (event.key === "Enter") {
			history.push(`/recipes/search?name=${searchValue}`);
		}
	};

	return (
		<div className={classes.navBarDisplayFlex}>
			<List aria-labelledby="main navigation" style={{ display: "flex", justifyContent: "space-between" }}>
				<ListItem className={classes.linkButton}>
					<NavLink to="/" className={classes.listItem}>
						<ListItemText>Home</ListItemText>
					</NavLink>
				</ListItem>
				<ListItem className={classes.linkButton}>
					<NavLink to="/members" className={classes.listItem}>
						<ListItemText>Members</ListItemText>
					</NavLink>
				</ListItem>
				<ListItem className={classes.linkButton} onMouseOver={handleMenuOpen}>
					<ListItemText>Recipes</ListItemText>
					<KeyboardArrowDownIcon fontSize="small" style={{ marginLeft: "2px", color: "#676767" }} />
				</ListItem>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					MenuListProps={{ onMouseLeave: handleMenuClose }}
				>
					<NavLink to="/categories" className={classes.listItem}>
						<MenuItem onClick={handleMenuClose}>Category List</MenuItem>
					</NavLink>
					<NavLink to="/recipes/search?sortBy=dateAdded" className={classes.listItem}>
						<MenuItem onClick={handleMenuClose}>Latest Recipes</MenuItem>
					</NavLink>
					<NavLink to="/recipes/search?sortBy=upvoteCount" className={classes.listItem}>
						<MenuItem onClick={handleMenuClose}>Most Liked Recipes</MenuItem>
					</NavLink>
				</Menu>
				<ListItem className={classes.linkButton}>
					<NavLink to="/contact" className={classes.listItem}>
						<ListItemText>Contact Us</ListItemText>
					</NavLink>
				</ListItem>
			</List>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search recipes..."
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					onChange={(event) => setSearchValue(event.target.value)}
					inputProps={{ "aria-label": "search" }}
					onKeyPress={(event) => handleSearch(event)}
				/>
			</div>
		</div>
	);
};

export default NavigationBar;
