import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { NavLink } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import bread from '../assets/bread.jpg';
import cookies from '../assets/cookies.jpg';
import hamburger from '../assets/hamburger.jpg';
import pancake from '../assets/pancake.jpg';
import steaks from '../assets/steaks.jpg';
import vegetables from '../assets/vegetables.jpg';
import footerOverlay from '../assets/footerOverlay.jpg';
import useNotifications from '../hooks/useNotifications';

const useStyles = makeStyles((theme) => ({
	footerGrid: {
		border: '1px solid #FFF',
		overflow: 'hidden',
		backgroundColor: '#FFF',
	},
	footerGridItem: {
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: '#FFF',
		width: '16.67%', 		// 100/6
		height: 'auto',
		[theme.breakpoints.down('md')]: {
			width: '33.33%'
		}
	},
	footerContentFlex: {
		backgroundColor: theme.palette.primary.main,
		backgroundImage: `url(${footerOverlay})`,
		backgroundSize: 'cover',
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			alignItems: 'center',
			flexDirection: 'column'
		}
	},
	footerContentItemContainer: {
		width: '33.33%',
		padding: '5% 0',
		[theme.breakpoints.up('md')]: {
			borderStyle: 'solid',
			borderWidth: '0 1px 0px 1px',
			borderColor: '#BC8F8F'
		},
		[theme.breakpoints.down('md')]: {
			width: '100%'
		}
	},
	footerContentItem: {
		[theme.breakpoints.down('md')]: {
			width: '80%'
		},
		display: 'flex',
		flexDirection: 'column',
		padding: '8% 5%',
	},
	footerTitleText: {
		color: '#FFF',
		marginBottom: '25px',
	},
	footerBodyText: {
		color: theme.palette.primary.contrastText,
		marginBottom: '20px',
		opacity: 0.8
	},
	footerLinkItem: {
		color: theme.palette.primary.contrastText,
		textDecoration: 'none',
		marginBottom: '15px',
		opacity: 0.8,
		'&:hover': {
			opacity: 1
		}
	},
	bottomBar: {
		padding: '2% 6% 2% 2%',
		backgroundColor: '#28292B',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			alignItems: 'center',
			flexDirection: 'column'
		}
	},
	navButton: {
		color: '#FFF',
		opacity: 0.8,
		'&:hover': {
			color: theme.palette.secondary.main,
			opacity: 1
		}
	}
}));

const Footer = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const recipeImages = [bread, cookies, hamburger, pancake, steaks, vegetables];

	return <>
        {/* Image row */}
        <Grid container wrap={isMobile ? 'wrap' : 'nowrap'} className={classes.footerGrid}>
            {recipeImages.map((recipe, i) => (
                <RecipeImage key={i} thumbImageUrl={recipe} />
            ))}
        </Grid>

        {/* Main footer content */}
        <div className={classes.footerContentFlex}>

            {/* Subscribe section */}
            <div className={classes.footerContentItemContainer}>
                <div className={classes.footerContentItem}>
                    <Typography variant='h5' className={classes.footerTitleText}>Subscribe</Typography>
                    <Typography variant='body2' className={classes.footerBodyText}>
                        Register and get notified about all the news & updates before it gets too late.
                    </Typography>
                    <SubscribeForm />
                </div>
            </div>

            {/* Explore section */}

            <div className={classes.footerContentItemContainer}>
                <div className={classes.footerContentItem}>
                    <Typography variant='h5' className={classes.footerTitleText}>Explore</Typography>
                    <NavLink to='/recipes/search' className={classes.footerLinkItem}>Browse Recipes</NavLink>
                    <NavLink to='/submit' className={classes.footerLinkItem}>Submit a Recipes</NavLink>
                    <NavLink to='/users' className={classes.footerLinkItem}>Members</NavLink>
                </div>
            </div>

            {/* Contact section */}
            <div className={classes.footerContentItemContainer}>
                <div className={classes.footerContentItem}>
                    <Typography variant='h5' className={classes.footerTitleText}>Contact</Typography>
                    <div style={{ display: 'flex' }}>
                        <PlaceIcon style={{ color: theme.palette.secondary.main, marginRight: '5%' }} />
                        <Typography variant='body2' className={classes.footerBodyText}>
                            123 Fake Street,
                            Toronto, Ontario
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <EmailIcon style={{ color: theme.palette.secondary.main, marginRight: '5%' }} />
                        <Typography variant='body2' className={classes.footerBodyText}>
                            fakeEmail@mail.com
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <PhoneIcon style={{ color: theme.palette.secondary.main, marginRight: '5%' }} />
                        <Typography variant='body2' className={classes.footerBodyText}>
                            416 123 0000
                        </Typography>
                    </div>
                </div>
            </div>
        </div>

        <div className={classes.bottomBar}>
            <Typography variant='body2' style={{ opacity: 0.8 }}>
                All rights reserved. Site built by Tyler Fretz
            </Typography>
            <div style={{ display: 'flex' }}>
                <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                    <IconButton aria-label="facebook" className={classes.navButton} size="large">
                        <FacebookIcon />
                    </IconButton>
                </a>
                <a href='https://www.twitter.com/' target='_blank' rel='noreferrer'>
                    <IconButton aria-label="twitter" className={classes.navButton} size="large">
                        <TwitterIcon />
                    </IconButton>
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                    <IconButton aria-label="instagram" className={classes.navButton} size="large">
                        <InstagramIcon />
                    </IconButton>
                </a>
                <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                    <IconButton aria-label="youtube" className={classes.navButton} size="large">
                        <YouTubeIcon />
                    </IconButton>
                </a>
            </div>
        </div>

    </>;
};


const RecipeImage = ({ thumbImageUrl }) => {
	const classes = useStyles();

	return (
		<Grid item className={classes.footerGridItem}>
			<img src={thumbImageUrl} style={{ width: '100%', height: '100%' }} />
		</Grid>
	);
};


const SubscribeForm = () => {
	const { addNotification } = useNotifications();

	return (
		<Formik
			initialValues={{ email: '' }}
			onSubmit={(values, actions) => {
				addNotification('Subscribe functionality not yet created... sorry.', 'info');
				actions.setSubmitting(false);
				actions.resetForm();
			}}
		>
			{({ submitForm }) => (
				<Form style={{ display: 'flex' }}>
					<Field
						component={TextField}
						name="email"
						type="email"
						label="Email Address"
						placeholder="Enter email address"
						variant="filled"
					/>
					<Button
						variant="contained"
						color="secondary"
						style={{ height: '100%', marginLeft: '2%' }}
						onClick={submitForm}
					>
						Sign Up
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default Footer;
