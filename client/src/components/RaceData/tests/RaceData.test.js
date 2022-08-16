import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockedStore } from '../../../helpers/mockedData';
import { RaceData } from '../RaceData';

test('renders RaceData', () => {
	render(
		<Provider store={mockedStore}>
			<RaceData />
		</Provider>
	);
	const raceData = screen.getByTestId('race-data');
	const winnerData = screen.getByTestId('winner-data');
	const btn = screen.getByRole('button');

	expect(raceData).toBeInTheDocument();
	expect(winnerData).toBeInTheDocument();
	expect(btn).toBeInTheDocument();
});
