import { gameWidth } from './utilities';

export const Ground = () => {
	const division = {
		stroke: '#458232',
		strokeWidth: '3px',
	};

	return (
		<line
			x1={gameWidth / -2}
			y1={100}
			x2={gameWidth / 2}
			y2={100}
			style={division}
		/>
	);
};
