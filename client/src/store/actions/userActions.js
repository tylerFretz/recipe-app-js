import userService from "../../services/userService";
import { enqueueSnackbar } from "../actions/notificationActions";
import { ADD_USER, INIT_ALL_USERS } from "../../constants/actionTypes";

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAllUsers();
		dispatch({
			type: INIT_ALL_USERS,
			payload: users
		});
	};
};

export const createUser = (username, email, password) => {
	return async dispatch => {
		try {
			const newUser = await userService.createUser(username, email, password);
			dispatch({
				type: ADD_USER,
				payload: newUser
			});
			dispatch(enqueueSnackbar({ message: `${newUser.username} registered!`, variant: "success" }));
			return Promise.resolve();
		} catch (err) {
			const message = (err.response &&
								err.response.data &&
								err.response.data.message) ||
								err.message ||
								err.toString();

			dispatch(enqueueSnackbar({ message, variant: "error" }));
			return Promise.reject();
		}
	};
};