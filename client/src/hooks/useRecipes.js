import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useNotifications from './useNotifications';
import { useAuthUser } from './useAuthUser';

const BASE_URL = '/api/recipes';

const getRecipes = async (queryOptions) => {
	const esc = encodeURIComponent;
	const queryString = `${BASE_URL}?`.concat(
		Object.keys(queryOptions)
			.map((k) => esc(k) + '=' + esc(queryOptions[k]))
			.join('&')
	);
	const { data } = await axios.get(queryString);
	return data;
};

const getRecipe = async (id) => {
	const { data } = await axios.get(`${BASE_URL}/${id}`);
	return data;
};

const createRecipe = async ({ newRecipe, config }) => {
	const { data } = await axios.post(BASE_URL, newRecipe, { headers: config });
	return data;
};

const likeRecipe = async ({ id, config }) => {
	const { data } = await axios.post(`${BASE_URL}/${id}/upvotes`, null, {
		headers: config,
	});
	return data;
};

const updateRecipe = async ({ updatedRecipe, config }) => {
	const { data } = await axios.put(`${BASE_URL}/${updatedRecipe.id}`, updatedRecipe, {
		headers: config,
	});
	return data;
};

const deleteRecipe = async ({ id, config }) => {
	const { data } = await axios.delete(`${BASE_URL}/${id}`, { headers: config });
	return data;
};

const createComment = async ({ id, comment, config }) => {
	const { data } = await axios.post(`${BASE_URL}/${id}/comments`, { comment }, {
		headers: config,
	});
	return data;
};

const getRecipesData = async () => {
	const { data } = await axios.get(`${BASE_URL}/data`);
	return data;
};

const useRecipes = () => {
	const queryClient = useQueryClient();
	const { addNotification } = useNotifications();
	const history = useHistory();
	const { getAuthHeader } = useAuthUser();
	const authHeader = getAuthHeader();

	const getRecipeById = (id) => {
		return useQuery(['recipes', id], () => getRecipe(id),
			{
				onError: () => {
					addNotification('Error retrieving recipe.', 'error');
				}
			}
		);
	};

	const queryRecipes = (queryOptions) => {
		return useQuery(['recipes', { ...queryOptions }], () => getRecipes(queryOptions),
			{
				onError: () => {
					addNotification('Error retrieving recipes.', 'error');
				}
			}
		);
	};

	// Returns unique categories, tags, and areas of all recipes in db
	const queryRecipeData = () => {
		return useQuery('recipeData', () => getRecipesData());
	};


	// Creating a new recipe
	const createMutation = useMutation(createRecipe, {
		onError: (error) => {
			addNotification(error.response.data.error, 'error');
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('recipes');
			history.push(`${BASE_URL}/${data.id}`);
			addNotification(`Added recipe: ${data.name}`, 'success');
		},
	});

	const addRecipe = (newRecipe) => {
		createMutation.mutate({ newRecipe, config: authHeader });
	};


	// Updating a recipe
	const updateMutation = useMutation(updateRecipe, {
		onError: (error) => {
			addNotification(error.response.data.error, 'error');
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('recipes');
			history.push(`${BASE_URL}/${data.id}`);
			addNotification(`Updated recipe: ${data.name}`, 'success');
		},
	});

	const updateExistingRecipe = (updatedRecipe) => {
		updateMutation.mutate({ updatedRecipe, config: authHeader });
	};


	// Updating the number of upvotes a recipe has
	const upvoteMutation = useMutation(likeRecipe, {
		onError: () => {
			addNotification('Must be logged in.', 'error');
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['recipes', data.id], data);
		},
	});

	const upvoteRecipe = (id) => {
		upvoteMutation.mutate({ id, config: authHeader });
	};


	// Deleting a recipe
	const deleteMutation = useMutation(deleteRecipe, {
		onError: () => {
			addNotification('Must be logged in.', 'error');
		},
		onSuccess: () => {
			queryClient.invalidateQueries('users');
			queryClient.invalidateQueries('recipes');
			addNotification('Deleted recipe.', 'success');
		},
	});

	const removeRecipe = (id) => {
		deleteMutation.mutate({ id, config: authHeader });
	};


	// Adding a comment to a recipe
	const commentMutation = useMutation(createComment, {
		onError: (error) => {
			addNotification(error.response.data.error, 'error');
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['recipes', data.id], data);
		},
	});

	const addComment = (id, comment) => {
		commentMutation.mutate({ id, comment, config: authHeader });
	};


	return {
		getRecipeById,
		queryRecipes,
		addRecipe,
		updateExistingRecipe,
		upvoteRecipe,
		removeRecipe,
		addComment,
		queryRecipeData,
	};
};

export default useRecipes;
