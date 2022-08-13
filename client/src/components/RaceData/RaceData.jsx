import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getRaceData } from '../../store/selectors';
import { getRaceDataAction } from '../../store/raceData/actionCreators';
import { scaleBand, scaleLinear, select } from 'd3';
import { colors } from '../../helpers/colors';

import './RaceData.scss';

export const RaceData = () => {
	const socket = io.connect('http://localhost:3002');
	const raceData = useSelector(getRaceData);
	const dispatch = useDispatch();
	const svgRef = useRef();

	const [data, setData] = useState(raceData);
	const [winner, setWinner] = useState([]);

	useEffect(() => {
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

				return obj;
			});
			const champion = dataWithColor.filter((item) => item.distance === 1000);

			if (champion.length === 0) {
				dispatch(
					getRaceDataAction([
						...dataWithColor.sort((a, b) => b.distance - a.distance),
					])
				);
			} else if (champion.length === 1) {
				setWinner(champion[0]);
				socket.off('ticker');
			}
		});
	}, []);

	useEffect(() => {
		setData(raceData);

		const svg = select(svgRef.current);
		const yScale = scaleBand()
			.paddingInner(0.1)
			.domain(data.map((item, index) => index))
			.range([0, 200]);
		const xScale = scaleLinear().domain([0, 500]).range([0, 500]);

		svg
			.selectAll('.bar')
			.data(data, (entry) => entry.name)
			.join('rect')
			.attr('fill', (entry) => entry.color)
			.attr('class', 'bar')
			.attr('x', 0)
			.attr('height', yScale.bandwidth())
			.transition()
			.attr('y', (entry, index) => yScale(index))
			.attr('width', (entry) => xScale(entry.distance));

		svg
			.selectAll('.label')
			.data(data, (entry) => entry.name)
			.join('text')
			.text((entry) => `🏇${entry.name} (${entry.distance}m)`)
			.attr('font-weight', 600)
			.attr('fill', 'rgba(52,52,52,0.84)')
			.attr('class', 'label')
			.attr('x', 20)
			.transition()
			.attr('y', (entry, index) => yScale(index) + yScale.bandwidth() - 10);
	}, [raceData]);

	return (
		<>
			<svg className='race__data' ref={svgRef}></svg>
			{Object.keys(winner).length !== 0 ? (
				<>
					<div className='race__winner'>
						<span style={{ color: `${winner.color}` }}>{winner.name}</span> won
						the race!
					</div>
					<button
						onClick={() => window.location.reload()}
						className='race__btn'
					>
						Restart race
					</button>
				</>
			) : null}
		</>
	);
};
