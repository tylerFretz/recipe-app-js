import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import useNotifications from './useNotifications';

const BASE_URL = '/api/login';
const AuthUserContext = createContext();

const loginUser = async ({ email, password }) => {
	const { data } = await axios.post(BASE_URL, {
		email,
		password,
	});
	return data;
};

export const AuthProvider = ({ children }) => {
	const { addNotification } = useNotifications();
	const [authUser, setAuthUser] = useState(null);

	const setAuthData = (loggedInUser) => {
		setAuthUser(JSON.parse(loggedInUser));
	};

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('recipe-app-user');
		loggedInUser ? setAuthData(loggedInUser) : setAuthData(null);
	}, []);

	const mutation = useMutation(loginUser, {
		onError: (error) => {
			addNotification(error.response.data.errors[0].msg, 'error');
		},
		onSuccess: (data) => {
			const { token, user } = data;
			setAuthData(JSON.stringify({ ...user, token: token }));
			window.localStorage.setItem(
				'recipe-app-user',
				JSON.stringify({ ...user, token: token })
			);
			addNotification('Logged in!', 'success');
		},
	});

	const login = (email, password) => {
		mutation.mutate({ email: email, password: password });
	};

	const logout = () => {
		setAuthData(null);
		window.localStorage.removeItem('recipe-app-user');
		addNotification('Logged out!', 'success');
	};

	const getAuthHeader = () => {
		if (authUser && authUser.token) {
			return { Authorization: 'Bearer ' + authUser.token };
		} else {
			return {};
		}
	};

	return (
		<AuthUserContext.Provider
			value={{ authUser, login, logout, getAuthHeader }}
		>
			{children}
		</AuthUserContext.Provider>
	);
};

export const useAuthUser = () => useContext(AuthUserContext);
