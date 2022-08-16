import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRaceData, getWinner } from '../../store/selectors';
import { scaleBand, scaleLinear, select } from 'd3';
import { getHorses } from '../../store/raceData/thunk';

import './RaceData.scss';

export const RaceData = () => {
	const raceData = useSelector(getRaceData);
	const winner = useSelector(getWinner);
	const dispatch = useDispatch();
	const svgRef = useRef();
	const [data, setData] = useState(raceData);

	useEffect(() => {
		dispatch(getHorses());
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
