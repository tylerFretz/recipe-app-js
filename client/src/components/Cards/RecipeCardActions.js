import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import useRecipes from '../../hooks/useRecipes';

const useStyles = makeStyles((theme) => ({
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

const RecipeCardActions = ({ recipe, isSubmitted }) => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);
	const { removeRecipe } = useRecipes();
	const history = useHistory();

	const handleDelete = (id) => {
		setDialogOpen(false);
		removeRecipe(id);
	};

	const handleUpdate = () => {
		setDialogOpen(false);
		history.push({
			pathname: '/submit',
			state: recipe
		});
	};

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: '5%' }}>
			{isSubmitted && (
				<Button
					disabled={dialogOpen}
					onClick={() => handleUpdate()}
					type='contained'
					className={classes.updateButton}
				>
					Update Recipe
				</Button>
			)}
			<Button
				disabled={dialogOpen}
				onClick={() => setDialogOpen(true)}
				type='contained'
				className={classes.deleteButton}
			>
				Delete Recipe
			</Button>
			<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<DialogTitle>Delete Recipe?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete <strong>{recipe.name}</strong>? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={() => setDialogOpen(false)} color='primary'>
						Cancel
					</Button>
					<Button onClick={() => handleDelete(recipe.id)} color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RecipeCardActions;

