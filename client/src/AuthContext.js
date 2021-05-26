import React, { createContext, useState, useEffect } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	const setAuthData = (loggedInUser) => {
		setAuth(JSON.parse(loggedInUser));
	};

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem("recipe-app-user");
		if (loggedInUser) {
			setAuth(loggedInUser);
		}
	}, []);

	return (
		<authContext.Provider value={{ auth, setAuthData }}>
			{children}
		</authContext.Provider>
	);
};

export default AuthProvider;