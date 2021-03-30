import axios from "axios";
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

const getRandomRecipe = async () => {
	const req = axios.get(`${baseUrl}random.php`);
	const res = await req;
	return res.data.meals[0];
};

export default { getRandomRecipe };