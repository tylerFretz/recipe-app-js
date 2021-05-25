import React, { createContext, useState } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	const setAuthData = (loggedInUser) => {
		setAuth(JSON.parse(loggedInUser));
	};

	return (
		<authContext.Provider value={{ auth, setAuthData }}>
			{children}
		</authContext.Provider>
	);
};

export default AuthProvider;