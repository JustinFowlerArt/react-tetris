import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { checkCollision, createStage } from './gameHelpers';
import { Menu } from './menu';
import { Stage } from './stage';

export const Tetris = () => {
	const [dropTime, setDropTime] = useState<number | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
	const { stage, setStage } = useStage(player, resetPlayer);

	const playerMove = (dir: number) => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos(dir, 0);
		}
	};

	const startGame = () => {
		// Reset everything
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
	};

	const drop = () => {
		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos(0, 1, false);
		} else {
			if (player.pos.y < 1) {
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos(0, 0, true);
		}
	};

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	};

	const handleKeyUp = ({ key }: React.KeyboardEvent<HTMLElement>) => {
		if (!gameOver) {
			if (key === 's' || key === 'ArrowDown') {
				setDropTime(1000);
			}
		}
	};

	const handleMove = ({ key }: React.KeyboardEvent<HTMLElement>) => {
		if (!gameOver) {
			switch (key) {
				case 'a':
				case 'ArrowLeft':
					{
						playerMove(-1);
					}
					break;
				case 'd':
				case 'ArrowRight':
					{
						playerMove(1);
					}
					break;
				case 's':
				case 'ArrowDown':
					{
						dropPlayer();
					}
					break;
				case 'w':
				case 'ArrowUp': {
					playerRotate(stage, 1);
				}
			}
		}
	};

	useInterval<() => void>(() => {
		drop();
	}, dropTime);

	return (
		<main
			className='h-screen w-screen bg-black flex justify-center items-center space-x-6'
			role='button'
			tabIndex={0}
			onKeyDown={e => handleMove(e)}
            onKeyUp={e => handleKeyUp(e)}
		>
			<Stage stage={stage} />
			<Menu startGame={startGame} gameOver={gameOver} />
		</main>
	);
};
