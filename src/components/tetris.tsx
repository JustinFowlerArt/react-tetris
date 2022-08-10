import { useState } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage } from './gameHelpers';
import { Menu } from './menu';
import { Stage } from './stage';

export const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const { player, updatePlayerPos, resetPlayer } = usePlayer();
	const { stage, setStage } = useStage(player, resetPlayer);

	const movePlayer = (dir: number) => {
		updatePlayerPos({ x: dir, y: 0 },);
	};

	const startGame = () => {
		// Reset everything
		setStage(createStage());
		resetPlayer();
	};

	const drop = () => {
        console.log
    };

	const dropPlayer = () => {
		drop();
	};

	const move = (e: React.KeyboardEvent<HTMLElement>) => {
		const { key } = e;
		if (!gameOver) {
			switch (key) {
				case 'a':
				case 'ArrowLeft':
					{
						movePlayer(-1);
					}
					break;
				case 'd':
				case 'ArrowRight':
					{
						movePlayer(1);
					}
					break;
				case 's':
				case 'ArrowDown':
					{
						dropPlayer();
					}
					break;
			}
		}
	};

	return (
		<main
			className='h-screen w-screen bg-black flex justify-center items-center space-x-6'
			role='button'
			tabIndex={0}
			onKeyDown={e => move(e)}
		>
			<Stage stage={stage} />
            <Menu startGame={startGame}/>
		</main>
	);
};
