import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

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
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
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
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5em',
		},
		fontSize: '2em',
	},
	linkButton: {
		opacity: 0.8,
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

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	return (
		<>
			<AppBar position="relative">
				<Toolbar>
					<Container className={classes.navBarDisplayFlex}>
						<NavLink to="/" className={classes.logoContainer}>
							<Hidden smDown>
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
									<NavLink
										to={`/users/${authUser.id}`}
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
												My Profile
											</ListItemText>
										</ListItem>
									</NavLink>
									<NavLink
										to="/"
										className={classes.linkText}
									>
										<ListItem
											button
											onClick={handleLogout}
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
		</>
	);
};

export default Header;
