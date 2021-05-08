import { INIT_ALL_USERS, ADD_USER } from "../../constants/actionTypes";

const userReducer = (state = [], action) => {
	switch(action.type) {
	case INIT_ALL_USERS:
		return action.payload;
	case ADD_USER:
		return [...state, action.payload];
	default:
		return state;
	}
};

export default userReducer;