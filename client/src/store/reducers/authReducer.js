import { LOGIN, LOGOUT } from "../../constants/actionTypes";

const user = JSON.parse(localStorage.getItem("recipe-app-user"));

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
	switch(action.type) {
	case LOGIN:
		return { isLoggedIn: true, user: action.payload };
	case LOGOUT:
		return { isLoggedIn: false, user: null };
	default:
		return state;
	}
};

export default authReducer;