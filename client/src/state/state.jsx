/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from "react";


const initialState = {
	recipes: {},
	users: {},
	loggedInUser: null
};

export const StateContext = createContext([
	initialState,
	() => initialState
]);

export const StateProvider = ({ reducer, children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);
