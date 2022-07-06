import { gameHeight, gameWidth } from './utilities';

export const Background = () => {
	const skyStyle = {
		fill: '#30abef',
	};

	return (
		<rect
			style={skyStyle}
			x={gameWidth / -2}
			y={100 - gameHeight}
			width={gameWidth}
			height={gameHeight}
		/>
	);
};
