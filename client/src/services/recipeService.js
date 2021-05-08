import axios from "axios";
import authService from "./authService";
const baseUrl = "/api/recipes";


const getConfig = (config) => {
	const defaultConfig = {
		headers: authService.getAuthHeader()
	};
	return {
		...defaultConfig,
		...config
	};
};

const getAllRecipes = async () => {
	const req = axios.get(baseUrl);
	const res = await req;
	return res.data;
};

const getSingleRecipe = async (id) => {
	const req = axios.get(`${baseUrl}/${id}`, getConfig());
	const res = await req;
	return res.data;
};

const createRecipe = async (newRecipe) => {
	const req = axios.post(baseUrl, newRecipe, getConfig());
	const res = await req;
	return res.data;
};

const updateRecipe = async (updatedRecipe) => {
	const req = axios.put(`${baseUrl}/${updatedRecipe.id}`, updatedRecipe, getConfig());
	const res = await req;
	return res.data;
};

const deleteRecipe = async (id) => {
	const req = axios.delete(`${baseUrl}/${id}`, getConfig());
	const res = await req;
	return res.data;
};

const addComment = async (id, comment) => {
	const req = axios.put(`${baseUrl}/${id}/comments`, { comment });
	const res = await req;
	return res.data;
};

const saveApiRecipe = async (newRecipe) => {
	try {
		const req = axios.post(`${baseUrl}/dev`, newRecipe, getConfig());
		const res = await req;
		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export default { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe, addComment, saveApiRecipe };