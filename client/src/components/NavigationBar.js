import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';

import { useAuthUser } from '../hooks/useAuthUser';
import NavigationBarMobile from './NavigationBarMobile';

const useStyles = makeStyles((theme) => ({
	navBarDisplayFlex: {
		position: 'sticky',
		top: 0,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		maxHeight: 50,
		background: '#FFF',
		margin: 0,
		width: '100%',
		zIndex: 6
	},
	flexList: {
		display: 'flex',
		justifyContent: 'space-between',
		flexGrow: 1,
		padding: '0% 10%',
		maxWidth: '60%'
	},
	listItem: {
		textDecoration: 'none',
		fontSize: '1.05rem',
		color: theme.palette.darkGrey.main,
		'&:hover': {
			color: theme.palette.secondary.main
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		border: '2px solid #D3D3D3',
		borderRadius: theme.shape.borderRadius,
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
				border: `2px solid ${theme.palette.secondary.main}`,
			},
		},
	},
}));

// home, recipes [category list, latest recipes, most liked recipes ], members, submit recipe, contact,
const NavigationBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();
	const history = useHistory();
	const { authUser } = useAuthUser();
	const [searchValue, setSearchValue] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
			history.push(`/recipes/search?name=${searchValue}`);
		}
	};

	return isMobile ? (
		<NavigationBarMobile />
	) : (
		<div className={classes.navBarDisplayFlex}>
			<List aria-labelledby="main navigation" className={classes.flexList}>
				<ListItem style={{ justifyContent: 'center' }}>
					<NavLink to="/" className={classes.listItem}>
						<ListItemText className={classes.listItem} disableTypography>Home</ListItemText>
					</NavLink>
				</ListItem>
				<ListItem>
					<NavLink to="/users" className={classes.listItem}>
						<ListItemText className={classes.listItem} disableTypography>Members</ListItemText>
					</NavLink>
				</ListItem>
				<ListItem id="popoverMenuButton" onClick={handleMenuOpen}>
					<ListItemText className={classes.listItem} disableTypography>Recipes</ListItemText>
					<KeyboardArrowDownIcon fontSize="small" style={{ color: '#676767' }} />
				</ListItem>
				<Menu
					anchorEl={document.getElementById('popoverMenuButton')}
					keepMounted
					open={menuOpen}
					onClose={handleMenuClose}
					MenuListProps={{ onMouseLeave: handleMenuClose }}
					variant="menu"
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
				{authUser && (
					<ListItem>
						<NavLink to="/submit" className={classes.listItem}>
							<ListItemText className={classes.listItem} disableTypography>Submit Recipe</ListItemText>
						</NavLink>
					</ListItem>
				)}
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
					inputProps={{ 'aria-label': 'search' }}
					onKeyPress={(event) => handleSearch(event)}
				/>
			</div>
		</div>
	);
};

export default NavigationBar;
