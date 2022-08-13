import { combineReducers, createStore } from 'redux';
import { raceDataReducer } from './raceData/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
	raceData: raceDataReducer,
});
export const store = createStore(rootReducer, composeWithDevTools());
