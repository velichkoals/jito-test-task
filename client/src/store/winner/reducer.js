import { SET_WINNER } from './actionTypes';

const defaultState = {};

export const winnerReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_WINNER: {
			return { ...action.payload };
		}
		default:
			return state;
	}
};
