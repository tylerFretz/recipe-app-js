import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Hidden from '@mui/material/Hidden';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import BackToTop from './BackToTop';

import { useAuthUser } from '../hooks/useAuthUser';
import chefHat from '../assets/chefHat.png';

const useStyles = makeStyles((theme) => ({
	navBarDisplayFlex: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	linkText: {
		textDecoration: 'none',
		textTransform: 'uppercase',
		color: '#FFF',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.8rem',
		},
	},
	menuText: {
		textDecoration: 'none',
		color: theme.palette.primary.main
	},
	logoContainer: {
		display: 'inline-flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '25%',
		textDecoration: 'none',
		textTransform: 'uppercase',
		color: 'white',
		opacity: 0.9,
		'&:hover': {
			opacity: 1,
		},
	},
	logo: {
		width: '25%',
		height: '25%',
	},
	brandTitle: {
		fontFamily: 'Courgette, cursive',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.5em',
		},
		fontSize: '2em',
	},
	linkButton: {
		opacity: 0.8,
		textTransform: 'uppercase',
		marginRight: '2px',
		'&:hover': {
			opacity: 1,
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();
	const { logout, authUser } = useAuthUser();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const handleProfileClick = (page) => {
		setMenuOpen(false);
		history.push({
			pathname: `/users/${authUser.id}`,
			state: { page }
		});
	};

	return <>
        <AppBar position="relative">
            <Toolbar>
                <Container className={classes.navBarDisplayFlex}>
                    <NavLink to="/" className={classes.logoContainer}>
                        <Hidden mdDown>
                            <img
                                className={classes.logo}
                                src={chefHat}
                                alt="logo"
                            />
                        </Hidden>
                        <Typography
                            variant="h1"
                            className={classes.brandTitle}
                        >
                            RECIPE APP
                        </Typography>
                    </NavLink>
                    <List
                        component="nav"
                        aria-labelledby="top navigation"
                        className={classes.navBarDisplayFlex}
                    >
                        {authUser && (
                            <>
                                <ListItem
                                    id='profilePopoverButton'
                                    onClick={handleMenuOpen}
                                    className={classes.linkButton}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Icon
                                        fontSize="small"
                                        style={{ marginRight: '2px' }}
                                    >
                                        person
                                    </Icon>
                                    <ListItemText disableTypography>
                                        My Profile
                                    </ListItemText>
                                    <KeyboardArrowDownIcon fontSize="small" />
                                </ListItem>
                                <NavLink
                                    to="/"
                                    className={classes.linkText}
                                >
                                    <ListItem
                                        button
                                        onClick={() => logout()}
                                        className={classes.linkButton}
                                    >
                                        <Icon
                                            fontSize="small"
                                            style={{ marginRight: '2px' }}
                                        >
                                            exit_to_app
                                        </Icon>
                                        <ListItemText disableTypography>
                                            Logout
                                        </ListItemText>
                                    </ListItem>
                                </NavLink>
                                <Menu
                                    anchorEl={document.getElementById('profilePopoverButton')}
                                    keepMounted
                                    open={menuOpen}
                                    onClose={handleMenuClose}
                                    MenuListProps={{ onMouseLeave: handleMenuClose }}
                                    variant='menu'
                                >
                                    <MenuItem onClick={() => handleProfileClick('submitted')} className={classes.menuText}>My submitted recipes</MenuItem>
                                    <MenuItem onClick={() => handleProfileClick('saved')} className={classes.menuText}>My saved recipes</MenuItem>
                                    <MenuItem onClick={() => handleProfileClick('account')} className={classes.menuText}>Account details</MenuItem>
                                </Menu>
                            </>
                        )}
                        {!authUser && (
                            <>
                                <NavLink
                                    to="/register"
                                    className={classes.linkText}
                                >
                                    <ListItem
                                        button
                                        className={classes.linkButton}
                                    >
                                        <Icon
                                            fontSize="small"
                                            style={{ marginRight: '2px' }}
                                        >
                                            person
                                        </Icon>
                                        <ListItemText disableTypography>
                                            Register
                                        </ListItemText>
                                    </ListItem>
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className={classes.linkText}
                                >
                                    <ListItem
                                        button
                                        className={classes.linkButton}
                                    >
                                        <Icon
                                            fontSize="small"
                                            style={{ marginRight: '2px' }}
                                        >
                                            exit_to_app
                                        </Icon>
                                        <ListItemText disableTypography>
                                            Log In
                                        </ListItemText>
                                    </ListItem>
                                </NavLink>
                            </>
                        )}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" style={{ minHeight: 0 }} />
        <BackToTop>
            <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
            >
                <KeyboardArrowUp />
            </Fab>
        </BackToTop>
    </>;
};

export default Header;
