import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "../../constants/actionTypes";

const notificationReducer = (state = [], action) => {
	switch(action.type) {
	case ENQUEUE_SNACKBAR:
		return [...state, { key: action.key, ...action.notification }];
	case CLOSE_SNACKBAR:
		return state.map(notification => (
			(action.dismissAll || notification.key === action.key)
				? { ...notification, dismissed: true }
				: { ...notification }
		));
	case REMOVE_SNACKBAR:
		return state.filter(notification => notification.key !== action.key);
	default:
		return state;
	}
};

export default notificationReducer;