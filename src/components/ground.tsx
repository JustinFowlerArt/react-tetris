import { gameWidth } from './utilities';

export const Ground = () => {
	return (
		<line
			x1={gameWidth / -2}
			y1={100}
			x2={gameWidth / 2}
			y2={100}
            className='stroke-[#458232] stroke-1'
		/>
	);
};
