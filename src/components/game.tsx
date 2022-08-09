import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas from './canvas';
import { checkCollisions } from './checkCollisions';
import { Stage } from './stage';
// import { handleKeyDown } from './controls';
import { createStage, gameHeight, gameWidth } from './gameHelpers';

interface Props {
	width: number;
	height: number;
}

export type iBlock = {
	id: number;
	position: { x: number; y: number };
	rotation: number;
	// subBlocks: Array<iSubBlock>;
}

// export interface iSubBlock {
// 	position.x: number;
// 	position.y: number;
// }

export const Game = ({ width, height }: Props) => {
	// const [score, setScore] = useState(0);
    const [stage, setStage] = useState(createStage())
	const [gameOver, setGameOver] = useState(false);

	const [counter, setCounter] = useState(0);
	const countRef = useRef(counter);
	countRef.current = counter;

	const [blocks, setBlocks] = useState<Array<iBlock>>([]);

	const [position, setPosition] = useState({ x: 0, y: 100 - gameHeight });
	const positionRef = useRef(position);
	positionRef.current = position;

	const [rotation, setRotation] = useState(0);
	const rotationRef = useRef(rotation);
	rotationRef.current = rotation;

	const [openSpace, setOpenSpace] = useState({ left: true, right: true });
	const openSpaceRef = useRef(openSpace);
	openSpaceRef.current = openSpace;

	const updateBlocks = () => {
		setBlocks([
			...blocks,
			{
				id: counter,
				position: { x: position.x, y: position.y },
				rotation: rotation,
				// subBlocks: [{ position.x, position.y }],
			},
		]);
		setCounter(counter + 1);
		setPosition({ x: 0, y: 100 - gameHeight });
		setRotation(0);
	};

	useEffect(() => {
		if (!gameOver) {
			window.addEventListener('keydown', handleKeyDown);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [gameOver]);

	useEffect(() => {
		if (!gameOver) {
			const initializer = setInterval(() => {
				setPosition(
					position => (position = { ...position, y: position.y + 64 })
				);
			}, 1000);
			return () => {
				clearInterval(initializer);
			};
		}
	}, [blocks, gameOver]);

	const updateBlock = useCallback(() => {
		const activeBlock = {
			x1: position.x - 32,
			y1: position.y - 32,
			x2: position.x + 32,
			y2: position.y + 33,
		};
		return activeBlock;
	}, [position.x, position.y]);

	useEffect(() => {
		if (!gameOver) {
			setOpenSpace({ left: true, right: true });
			checkCollisions(
				updateBlock,
				blocks,
				updateBlocks,
				setGameOver,
				setOpenSpace
			);
		}
	}, [updateBlock, gameOver]);

	const handleKeyDown = (e: KeyboardEvent) => {
		const { key } = e;
		switch (key) {
			case 'a':
			case 'ArrowLeft':
				{
					if (
						positionRef.current.x > gameWidth / -2 &&
						openSpaceRef.current.left
					) {
						setPosition(
							position => (position = { ...position, x: position.x - 64 })
						);
					}
				}
				break;
			case 'd':
			case 'ArrowRight':
				{
					if (
						positionRef.current.x < gameWidth / 2 - 64 &&
						openSpaceRef.current.right
					) {
						setPosition(
							position => (position = { ...position, x: position.x + 64 })
						);
					}
				}
				break;
			case 'w':
			case 'ArrowUp':
				{
					if (rotationRef.current <= 0) {
						setRotation(rotation => 270 - rotation);
					} else {
						setRotation(rotation => rotation - 90);
					}
				}
				break;
			case 's':
			case 'ArrowDown':
				{
					if (rotationRef.current >= 270) {
						setRotation(rotation => rotation - 270);
					} else {
						setRotation(rotation => rotation + 90);
					}
				}
				break;
			case ' ': {
				{
					setPosition(
						position => (position = { ...position, y: position.y + 64 })
					);
				}
				break;
			}
			default:
				break;
		}
	};

	if (gameOver) return <h1 className='text-4xl text-center'>Game Over</h1>;

	return (
		<Canvas
			width={width}
			height={height}
			blocks={blocks}
			position={position}
			rotation={rotation}
		/>
		// <main className='flex flex-col justify-center items-center'>
		// 	<h1 className='text-3xl'>React Tetris</h1>
		// 	<h2 className='text-xl'>Score: {score}</h2>
		// 	<div className='flex flex-col items-center p-4'>
		// 		<div className='relative bg-slate-500 w-80 h-[40rem] m-4'>
		// 			<Block
		// 				position.x={position.x}
		// 				position.y={position.y}
		// 				rotation={rotation}
		// 			/>
		// 			{blocks?.map(block => (
		// 				<Block
		// 					key={block.id}
		// 					position.x={block.position.x}
		// 					position.y={block.position.y}
		// 					rotation={block.rotation}
		// 				/>
		// 			))}
		// 		</div>
		// 	</div>
		// </main>
	);
};
