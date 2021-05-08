import recipeService from "../../services/recipeService";
import { enqueueSnackbar } from "../actions/notificationActions";
import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, INIT_ALL_RECIPES } from "../../constants/actionTypes";

export const initializeRecipes = () => {
	return async dispatch => {
		const recipes = await recipeService.getAllRecipes();
		dispatch({
			type: INIT_ALL_RECIPES,
			payload: recipes
		});
	};
};

export const addRecipe = (recipe) => {
	return async dispatch => {
		try {
			const newRecipe = await recipeService.createRecipe(recipe);
			dispatch({
				type: ADD_RECIPE,
				payload: newRecipe
			});
			dispatch(enqueueSnackbar({ message: `Added ${recipe.name}`, variant: "success" }));
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.message) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};

export const upvoteRecipe = (recipe) => {
	return async dispatch => {
		try {
			const updatedRecipe = await recipeService.updateRecipe(recipe);
			dispatch({
				type: UPDATE_RECIPE,
				payload: updatedRecipe
			});
			dispatch(enqueueSnackbar({ message: `Upvoted ${updatedRecipe.name}`, variant: "success" }));
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.message) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};

export const deleteRecipe = (recipe) => {
	return async dispatch => {
		try {
			const deletedRecipe = await recipeService.remove(recipe.id);
			dispatch({
				type: DELETE_RECIPE,
				payload: deletedRecipe
			});
			dispatch(enqueueSnackbar({ message: `Deleted ${recipe.name}`, variant: "success" }));
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.message) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};

export const addComment = (id, comment) => {
	return async dispatch => {
		try {
			const updatedRecipe = await recipeService.addComment(id, comment);
			dispatch({
				type: UPDATE_RECIPE,
				payload: updatedRecipe
			});
			dispatch(enqueueSnackbar({ message: "Comment added!", variant: "success" }));
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.message) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};
