import recipeService from "../../services/recipeService";
import { enqueueSnackbar } from "../actions/notificationActions";
import {
	ADD_RECIPE,
	ADD_RECIPES,
	UPDATE_RECIPE,
	DELETE_RECIPE,
	INIT_ALL_RECIPES
} from "../../constants/actionTypes";

export const getAllRecipes = () => {
	return async dispatch => {
		const recipes = await recipeService.getAllRecipes();
		dispatch({
			type: INIT_ALL_RECIPES,
			payload: recipes
		});
	};
};

export const getDefaultInitialRecipes = () => {
	return async dispatch => {
		try {
			const topRatedQuery = { "sortBy": "upvoteCount", "order": "desc", "limit": "3" };
			const latestQuery = { "sortBy": "dateAdded", "order": "desc", "limit": "3" };
			const topRatedRecipes = await recipeService.queryRecipes(topRatedQuery);
			const latestRecipes = await recipeService.queryRecipes(latestQuery);
			dispatch({
				type: ADD_RECIPES,
				payload: [...topRatedRecipes, ...latestRecipes]
			});
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.error) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};

export const queryRecipes = (queryOptions) => {
	return async dispatch => {
		try {
			const recipes = await recipeService.queryRecipes(queryOptions);
			dispatch({
				type: ADD_RECIPES,
				payload: recipes
			});
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.error) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
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
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.error) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};

export const upvoteRecipe = (id) => {
	return async dispatch => {
		try {
			const updatedRecipe = await recipeService.updateRecipe(id);
			dispatch({
				type: UPDATE_RECIPE,
				payload: updatedRecipe
			});
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.error) ||
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
					err.response.data.error) ||
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
					err.response.data.error) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
		}
	};
};
