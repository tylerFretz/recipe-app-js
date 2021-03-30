export const setRecipeList = (recipes) => {
	return { type: "SET_RECIPE_LIST", payload: recipes };
};

export const addRecipe = (recipe) => {
	return { type: "ADD_RECIPE", payload: recipe };
};

export const setUserList = (users) => {
	return { type: "SET_USERS_LIST", payload: users };
};

export const addUser = (user) => {
	return { type: "ADD_USER", payload: user };
};

export const loginUser = (loginPayload) => {
	return { type: "LOGIN_USER", payload: loginPayload };
};

export const logoutUser = () => {
	return { type: "LOGOUT_USER" };
};