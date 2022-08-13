import { GET_RACE_DATA } from './actionTypes';

const defaultState = [];

export const raceDataReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_RACE_DATA: {
			return [...action.payload];
		}
		default:
			return state;
	}
};
