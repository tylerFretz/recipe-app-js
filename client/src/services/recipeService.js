import axios from "axios";
const baseUrl = "/api/recipes";

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getAllRecipes = async () => {
	const req = axios.get(baseUrl);
	const res = await req;
	return res.data;
};

const createRecipe = async (newRecipe) => {
	const config = {
		headers: { Authorization: token }
	};

	const req = axios.post(baseUrl, newRecipe, config);
	const res = await req;
	return res.data;
};

const updateRecipe = async (id, updatedRecipe) => {
	const req = axios.put(`${baseUrl}/${id}`, updatedRecipe);
	const res = await req;
	return res.data;
};

const deleteRecipe = async (id) => {
	const config = {
		headers: { Authorization: token }
	};

	const req = axios.delete(`${baseUrl}/${id}`, config);
	const res = await req;
	return res.data;
};

export default { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, setToken };