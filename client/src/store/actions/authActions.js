import authService from "../../services/authService";
import { enqueueSnackbar } from "../actions/notificationActions";
import { LOGIN, LOGOUT } from "../../constants/actionTypes";

export const login = (email, password) => {
	return async dispatch => {
		try {
			const { token, user } = await authService.loginUser(email, password);
			window.localStorage.setItem("recipe-app-user", JSON.stringify({ ...user, token: token }));
			dispatch({
				type: LOGIN,
				payload: {
					token,
					...user
				}
			});
			return Promise.resolve();
		} catch (err) {
			const message = (err.response &&
					err.response.data &&
					err.response.data.error) ||
					err.message ||
					err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
			return Promise.reject();
		}
	};
};

export const logout = () => {
	return async dispatch => {
		window.localStorage.removeItem("recipe-app-user");
		dispatch({
			type: LOGOUT
		});
		dispatch(enqueueSnackbar({ message: "logged out", variant: "success" }));
	};
};

export const setUser = () => {
	const loggedInUser = window.localStorage.getItem("recipe-app-user");
	if (loggedInUser) {
		const user = JSON.parse(loggedInUser);
		return {
			type: LOGIN,
			payload: user
		};
	}
	return { type: LOGOUT };
};