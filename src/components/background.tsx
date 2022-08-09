import { gameHeight, gameWidth } from './gameHelpers';

export const Background = () => {
	return (
		<rect
			className='fill-sky-500'
			x={gameWidth / -2}
			y={100 - gameHeight}
			width={gameWidth}
			height={gameHeight}
		/>
	);
};
