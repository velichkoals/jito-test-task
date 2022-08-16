import { getRaceDataAction } from './actionCreators';
import { colors } from '../../helpers/colors';
import io from 'socket.io-client';
import { setWinnerAction } from '../winner/actionCreators';
const socket = io.connect('http://localhost:3002');

export const getHorses = () => {
	return (dispatch) => {
		socket.emit('start');
		socket.on('ticker', (response) => {
			const dataWithColor = [];
			response.map((item, index) => {
				const obj = {
					name: item.name,
					distance: item.distance,
					color: colors[index],
				};
				dataWithColor.push(obj);
				dataWithColor.sort((a, b) => b.distance - a.distance);

				return obj;
			});

			const champion = dataWithColor.filter((item) => item.distance === 1000);

			if (champion.length !== 6) {
				dispatch(getRaceDataAction(dataWithColor));
			} else {
				socket.off('ticker');
			}
			if (champion.length === 1) {
				dispatch(setWinnerAction(champion[0]));
			}
		});
	};
};
