import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuthUser } from './useAuthUser';
import useNotifications from './useNotifications';

const BASE_URL = '/api/users';

const getUsers = async () => {
	const { data } = await axios.get(BASE_URL);
	return data;
};

const getUser = async (id) => {
	const { data } = await axios.get(`${BASE_URL}/${id}`);
	return data;
};

const createUser = async ({ newUser }) => {
	const { data } = await axios.post(BASE_URL, newUser);
	return data;
};

const update = async ({ email, username, id, config }) => {
	const { data } = await axios.put(
		`${BASE_URL}/${id}`,
		{ email, username },
		{ headers: config }
	);
	return data;
};

const addSaved = async ({ id, recipeId, config }) => {
	const { data } = await axios.post(
		`${BASE_URL}/${id}/savedRecipes`,
		{ recipeId },
		{ headers: config }
	);
	return data;
};

const deleteUser = async ({ id, config }) => {
	const { data } = await axios.delete(`${BASE_URL}/${id}`, { headers: config });
	return data;
};

const useUsers = () => {
	const queryClient = useQueryClient();
	const history = useHistory();
	const { getAuthHeader, authUser, logout } = useAuthUser();
	const { addNotification } = useNotifications();
	const authHeader = getAuthHeader();

	const getUserById = (id) => {
		return useQuery(['users', id], () => getUser(id),
			{
				onError: () => {
					addNotification('Error retrieving user.', 'error');
				}
			}
		);
	};

	const getAllUsers = () => {
		return useQuery(['users'], () => getUsers(),
			{
				onError: () => {
					addNotification('Error retrieving users.', 'error');
				}
			}
		);
	};


	// Creating a new user
	const createMutation = useMutation(createUser, {
		onError: (error) => {
			addNotification(error.response.data.errors[0].msg, 'error');
		},
		onSuccess: () => {
			queryClient.invalidateQueries('users');
			history.push('/login');
			addNotification('Successfully registered', 'success');
		},
	});

	const addUser = (newUser) => {
		createMutation.mutate({ newUser });
	};


	// Updating a users email OR username
	const updateMutation = useMutation(update, {
		onError: (error) => {
			addNotification(error.response.data.errors[0].msg, 'error');
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['users', data.id], data);
		},
	});

	const updateUser = (email, username, id) => {
		updateMutation.mutate({ email, username, id, config: authHeader });
	};


	// Adding a recipe to a users saved recipes collection
	const addSavedRecipeMutation = useMutation(addSaved, {
		onError: (error) => {
			addNotification(error.response.data.error, 'error');
		},
		onSuccess: () => {
			addNotification('Saved Recipe!', 'success');
			queryClient.invalidateQueries('users');
		},
	});

	const saveRecipe = (recipeId) => {
		const userId = authUser ? authUser.id : '';
		addSavedRecipeMutation.mutate({
			id: userId,
			recipeId,
			config: authHeader
		});
	};


	// Deleting a user
	const deleteUserMutation = useMutation(deleteUser, {
		onError: (error) => {
			addNotification(error.response.data.error, 'error');
		},
		onSuccess: () => {
			queryClient.invalidateQueries('users');
			queryClient.invalidateQueries('recipes');
			logout();
			history.push('/');
			addNotification('Account deleted.', 'success');
		},
	});

	const removeUser = () => {
		const userId = authUser ? authUser.id : '';
		deleteUserMutation.mutate({
			id: userId,
			config: authHeader
		});
	};

	return { getUserById, getAllUsers, addUser, updateUser, saveRecipe, removeUser };
};

export default useUsers;
