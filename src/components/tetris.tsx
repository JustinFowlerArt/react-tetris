import { useState } from 'react';
import { useGameStatus } from '../hooks/useGameStatus';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { checkCollision, createStage } from './gameHelpers';
import { Stage } from './stage';
import { Display } from './display';

export const Tetris = () => {
	const [dropTime, setDropTime] = useState<number | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
	const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
	const { score, setScore, rows, setRows, level, setLevel } =
		useGameStatus(rowsCleared);

	const speed = 1000 / (level + 1) + 200;

	const playerMove = (dir: number) => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos(dir, 0);
		}
	};

	const startGame = () => {
		// Reset everything
		setStage(createStage());
		setDropTime(speed);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	};

	const drop = () => {
		// Increase level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			setLevel(prev => prev + 1);
			// Also increase speed
			setDropTime(speed);
		}
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
				setDropTime(speed);
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
		<div
			className='h-screen w-screen bg-black flex justify-center items-center space-x-6'
			role='button'
			tabIndex={0}
			onKeyDown={e => handleMove(e)}
			onKeyUp={e => handleKeyUp(e)}
		>
			<Stage stage={stage} />
			<aside className='flex flex-col space-y-4 w-48'>
				{gameOver && <Display text='Game Over' />}
				<Display text={`Score: ${score}`} />
				<Display text={`Rows: ${rows}`} />
				<Display text={`Level: ${level}`} />
				<button
					className='bg-slate-400 text-slate-900 border rounded-xl py-3 px-6 font-bold hover:bg-slate-900 hover:border-slate-400 hover:text-slate-400'
					onClick={startGame}
				>
					Start Game
				</button>
			</aside>
		</div>
	);
};
