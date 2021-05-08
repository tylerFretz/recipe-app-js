import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import recipeReducer from "./reducers/recipeReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const reducer = combineReducers({
	recipes: recipeReducer,
	notifications: notificationReducer,
	users: userReducer,
	auth: authReducer
});


const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

export default store;