import { INIT_ALL_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "../../constants/actionTypes";

const recipeReducer = (state = [], action) => {
	switch (action.type) {
	case INIT_ALL_RECIPES:
		return action.payload;
	case ADD_RECIPE:
		return [...state, action.payload];
	case UPDATE_RECIPE:
		return state.map(recipe => recipe.id !== action.payload.id ? recipe : action.payload);
	case DELETE_RECIPE:
		return state.filter(recipe => recipe.id !== action.payload.id);
	default:
		return state;
	}
};

export default recipeReducer;