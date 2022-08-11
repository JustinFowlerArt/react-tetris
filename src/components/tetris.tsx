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
			className='h-screen w-screen bg-black flex flex-col justify-center items-center text-sm xs:text-base sm:flex-row'
			role='button'
			tabIndex={0}
			onKeyDown={e => handleMove(e)}
			onKeyUp={e => handleKeyUp(e)}
		>
			<aside className='grid grid-cols-2 gap-2 mb-4 sm:mb-0 sm:gap-4 sm:w-48 sm:order-2 sm:ml-6'>
				{gameOver && <Display text='Game Over' />}
				<Display key={`Score: ${score}`} text='Score: ' value={score} />
				<Display key={`Rows: ${rows}`} text='Rows: ' value={rows} />
				<Display key={`Level: ${level}`} text='Level: ' value={level} />
				<button
					className='bg-slate-400 text-slate-900 border font-bold rounded-xl py-2 px-4 sm:py-3 sm:px-6 sm:col-span-2 hover:bg-slate-900 hover:border-slate-400 hover:text-slate-400'
					onClick={startGame}
				>
					START GAME
				</button>
			</aside>
			<Stage stage={stage} />
		</div>
	);
};
