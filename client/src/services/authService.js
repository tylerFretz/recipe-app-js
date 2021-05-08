import axios from "axios";
const baseUrl = "/api/login";

const loginUser = async (email, password) => {
	const res = await axios.post(baseUrl, {
		email,
		password
	});
	return res.data;
};

const getAuthHeader = () => {
	const user = JSON.parse(localStorage.getItem("recipe-app-user"));

	if (user && user.token) {
		return { Authorization: "Bearer " + user.token };
	} else {
		return {};
	}
};

export default { loginUser,  getAuthHeader };