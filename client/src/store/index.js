import { applyMiddleware, combineReducers, createStore } from 'redux';
import { raceDataReducer } from './raceData/reducer';
import { winnerReducer } from './winner/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
	raceData: raceDataReducer,
	winner: winnerReducer,
});
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
