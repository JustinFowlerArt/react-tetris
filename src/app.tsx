import { useState, useEffect } from 'react';
import { Game } from './components/game';

function useWindowDimensions() {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const updateWidthAndHeight = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', updateWidthAndHeight);
		return () => window.removeEventListener('resize', updateWidthAndHeight);
	});

	return {
		width,
		height,
	};
}

export const App = () => {
	const { width, height } = useWindowDimensions();

	return <Game width={width} height={height} />;
};
