import { useState } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { Stage } from './stage';

export const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const { player } = usePlayer();
	const { stage, setStage } = useStage(player);

	return (
		<main className='h-screen w-screen bg-black flex justify-center items-center'>
			<Stage stage={stage} />
		</main>
	);
};
