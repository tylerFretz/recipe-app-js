import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuthUser from "./useAuthUser";
import useNotifications from "./useNotifications";

const BASE_URL = "/api/users";

const getUsers = async () => {
	const { data } = await axios.get(BASE_URL);
	return data;
};

const getUser = async (id) => {
	const { data } = await axios.get(`${BASE_URL}/${id}`);
	return data;
};

const createUser = async (newUser) => {
	const { data } = await axios.post(BASE_URL, newUser);
	return data;
};

const deleteUser = async (id, config) => {
	const { data } = await axios.delete(`${BASE_URL}/${id}`, config);
	return data;
};

const update = async (updatedUser, config) => {
	const { data } = await axios.put(`${BASE_URL}/${updatedUser.id}`, updatedUser, config);
	return data;
};

const addFavourite = async (id, recipeId, config) => {
	const { data } = await axios.post(`${BASE_URL}/${id}/favourites`, recipeId, config);
	return data;
};

const useUsers = () => {
	const queryClient = useQueryClient();
	const history = useHistory();
	const { getAuthHeader, logout, getAuthUser } = useAuthUser();
	const { addNotification } = useNotifications();
	const authHeader = getAuthHeader();
	const { id: loggedInUserId } = getAuthUser();

	const getUserById = (id) => {
		return useQuery(["users", id],
			() => getUser(id));
	};

	const getAllUsers = () => {
		return useQuery(["users"],
			() => getUsers());
	};

	const createMutation = useMutation(createUser, {
		onError: (error) => {
			addNotification(error.response.data.errors[0].msg, "error");
		},
		onSuccess: () => {
			queryClient.invalidateQueries("users");
			addNotification("Successfully registered", "success");
			history.push("/login");
		}
	});

	const addUser = (username, email, password) => {
		createMutation.mutate({ username: username, email: email, password: password });
	};

	const deleteMutation = useMutation(deleteUser, {
		onError: (error) => {
			addNotification(error.response.data.error, "error");
		},
		onSuccess: () => {
			queryClient.invalidateQueries("users");
			logout();
			history.push("/");
		}
	});

	const removeUser = (id) => {
		deleteMutation.mutate({ id, config: authHeader });
	};

	const updateMutation = useMutation(update, {
		onError: (error) => {
			addNotification(error.response.data.error, "error");
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["users", data.id], data);
		}
	});

	const updateUser = (updatedUser) => {
		updateMutation.mutate({ updatedUser, config: authHeader });
	};

	const addFavoutiteMutation = useMutation(addFavourite, {
		onError: (error) => {
			addNotification(error.response.data.error, "error");
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["users", data.id], data);
		}
	});

	const saveRecipe = (recipeId) => {
		addFavoutiteMutation.mutate({ id: loggedInUserId, recipeId, config: authHeader });
	};

	return { getUserById, getAllUsers, addUser, removeUser, updateUser, saveRecipe };
};

export default useUsers;