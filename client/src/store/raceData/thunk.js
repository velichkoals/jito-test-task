import axios from 'axios';
import { getUsersAction } from './actionCreators';

export const getUsers = (param) => {
	return (dispatch) => {
		return axios
			.get(`http://ws-old.parlament.ch/${param}?format=json`)
			.then((response) => dispatch(getUsersAction(response.data)))
			.catch((response) => response.data);
	};
};
