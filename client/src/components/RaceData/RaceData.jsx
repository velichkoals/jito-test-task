import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getRaceData } from '../../store/selectors';
import { getRaceDataAction } from '../../store/raceData/actionCreators';

export const RaceData = () => {
	const socket = io.connect('http://localhost:3002');
	const raceData = useSelector(getRaceData);
	const dispatch = useDispatch();

	useEffect(() => {
		socket.emit('start');
		socket.on('ticker', (response) => {
			dispatch(getRaceDataAction([...response]));
		});
	}, []);

	return (
		<div>
			{raceData.map((item) => (
				<div key={item.name}>
					<div>{item.name}</div>
					<div>{item.distance}</div>
				</div>
			))}
		</div>
	);
};
