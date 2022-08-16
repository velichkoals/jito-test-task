import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockedStore } from './helpers/mockedData';
import App from './App';

test('renders App', () => {
	render(
		<Provider store={mockedStore}>
			<App />
		</Provider>
	);
	const titleElement = screen.getByText(/horse race/i);
	expect(titleElement).toBeInTheDocument();
});
