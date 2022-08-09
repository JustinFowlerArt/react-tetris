import { useState, useEffect } from 'react';
import { Game } from './components/game';
import { Tetris } from './components/tetris';

export const App = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
        const updateWidthAndHeight = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
    
		window.addEventListener('resize', updateWidthAndHeight);
		return () => window.removeEventListener('resize', updateWidthAndHeight);
	}, []);

	return <Tetris />;
};
