export const mockedState = {
	raceData: [
		{
			name: 'Rebel',
			distance: 325,
			color: 'rgba(62,149,181,0.6)',
		},
		{
			name: 'Lucy',
			distance: 1000,
			color: 'rgba(48,201,119,0.6)',
		},
	],

	winner: {
		name: 'Rebel',
		distance: 1000,
		color: 'rgba(62,149,181,0.6)',
	},
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
