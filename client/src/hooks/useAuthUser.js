import { useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { authContext } from "../AuthContext";
import useNotifications from "./useNotifications";

const BASE_URL = "/api/login";

const loginUser = async ({ email, password }) => {
	const { data } = await axios.post(BASE_URL, {
		email,
		password
	});
	return data;
};

const useAuthUser = () => {
	const { addNotification } = useNotifications();
	const { setAuthData, auth } = useContext(authContext);

	const mutation = useMutation(loginUser, {
		onError: (error) => {
			addNotification(error.response.data.errors[0].msg, "error");
		},
		onSuccess: (data) => {
			const { token, user } = data;
			setAuthData(JSON.stringify({ ...user, token: token }));
			window.localStorage.setItem("recipe-app-user", JSON.stringify({ ...user, token: token }));
			addNotification("Logged in!", "success");
		}
	});

	const login = (email, password) => {
		mutation.mutate({ email: email, password: password });
	};

	const logout = () => {
		setAuthData(null);
		window.localStorage.removeItem("recipe-app-user");
		addNotification("Logged out!", "success");
	};

	const getAuthHeader = () => {
		if (auth && auth.token) {
			return { Authorization: "Bearer " + auth.token };
		} else {
			return {};
		}
	};

	const getAuthUser = () => {
		return auth;
	};

	return { login, logout, getAuthHeader, getAuthUser };
};

export default useAuthUser;