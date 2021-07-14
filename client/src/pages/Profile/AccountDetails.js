import React, { useState } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import useUsers from '../../hooks/useUsers';

const useStyles = makeStyles((theme) => ({
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'

	},
	sectionContainer: {
		padding: '2%',
		margin: '2%',
		backgroundColor: '#FFF',
		width: theme.spacing(50),
		[theme.breakpoints.down('sm')]: {
			width: theme.spacing(40),
		}
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: '5% 0'
	},
	updateButton: {
		backgroundColor: theme.palette.secondary.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: '#a9c483',
		}
	},
	deleteButton: {
		margin: '0% 5%',
		backgroundColor: theme.palette.primary.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: '#000',
		}
	}
}));

const AccountDetails = ({ user }) => {
	const classes = useStyles();
	const [email, setEmail] = useState(user.email);
	const [username, setUsername] = useState(user.username);
	const [emailUpdateOpen, setEmailUpdateOpen] = useState(false);
	const [usernameUpdateOpen, setUsernameUpdateOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const { updateUser, removeUser } = useUsers();
	const formattedDate = format(new Date(user.joinDate), 'MMMM dd, yyyy');

	const handleEmailChange = event => setEmail(event.target.value);
	const handleUsernameChange = event => setUsername(event.target.value);

	const handleUserUpdate = () => {
		updateUser(email, username, user.id);
	};

	const handleUserDelete = () => {
		setDialogOpen(false);
		removeUser();
	};

	return (
		<Container>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Typography component='h2' style={{ fontSize: '2.5rem' }}>Account Details</Typography>
			</div>
			<div className={classes.contentContainer}>
				<div className={classes.sectionContainer}>
					<div className={classes.itemContainer}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography><strong>Username: </strong> {user.username}</Typography>
							<Button onClick={() => setUsernameUpdateOpen(!usernameUpdateOpen)}>{usernameUpdateOpen ? 'Close' : 'Update'}</Button>
						</div>
						<div style={{ display: usernameUpdateOpen ? 'block' : 'none' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<TextField
									label='New Username'
									value={username}
									onChange={handleUsernameChange}
								/>
								<Button
									className={classes.updateButton}
									onClick={handleUserUpdate}
								>
									Submit
								</Button>
							</div>
						</div>
					</div>

					<div className={classes.itemContainer}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography><strong>Email: </strong> {user.email}</Typography>
							<Button onClick={() => setEmailUpdateOpen(!emailUpdateOpen)}>{emailUpdateOpen ? 'Close' : 'Update'}</Button>
						</div>
						<div style={{ display: emailUpdateOpen ? 'block' : 'none' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<TextField
									label='New Email'
									value={email}
									onChange={handleEmailChange}
								/>
								<Button
									className={classes.updateButton}
									onClick={handleUserUpdate}
								>
									Submit
								</Button>
							</div>
						</div>
					</div>


					<div className={classes.itemContainer}>
						<Typography><strong>Join Date: </strong>{formattedDate}</Typography>
					</div>
					<div className={classes.itemContainer}>
						<Typography><strong>Submitted Recipes: </strong>{user.submittedRecipes.length}</Typography>
					</div>
					<div className={classes.itemContainer}>
						<Typography><strong>Saved Recipes: </strong>{user.savedRecipes.length}</Typography>
					</div>
				</div>

				<div className={classes.sectionContainer} style={{ background: '#ea7c7c' }}>
					<div className={classes.itemContainer}>
						<Button
							className={classes.deleteButton}
							disabled={dialogOpen}
							onClick={() => setDialogOpen(true)}
							type='contained'
						>
							Delete Account
						</Button>
					</div>

					<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
						<DialogTitle>Delete Account</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Are you sure you want to delete your account? This action will also delete all recipes
								you have submitted to Recipe App. This cannot be undone.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={() => setDialogOpen(false)} color='primary'>
								Cancel
							</Button>
							<Button onClick={() => handleUserDelete()} color='secondary'>
								Delete
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</Container >
	);
};

export default AccountDetails;