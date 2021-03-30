export const reducer = (state, action) => {
	switch (action.type) {
	case "SET_RECIPE_LIST":
		return {
			...state,
			recipes: {
				...action.payload.reduce(
					(memo, recipe) => ({ ...memo, [recipe.id]: recipe }),
					{}
				),
				...state.recipes
			}
		};
	case "ADD_RECIPE":
		return {
			...state,
			recipes: {
				...state.recipes,
				[action.payload.id]: action.payload
			}
		};
	case "SET_USER_LIST":
		return {
			...state,
			users: {
				...action.payload.reduce(
					(memo, user) => ({ ...memo, [user.id]: user }),
					{}
				),
				...state.users
			}
		};
	case "ADD_USER":
		return {
			...state,
			users: {
				...state.users,
				[action.payload.id]: action.payload
			}
		};
	case "LOGIN":
		return {
			...state,
			loggedInUser: action.payload
		};
	case "LOGOUT":
		return {
			...state,
			loggedInUser: null
		};
	default:
		return state;
	}
};
