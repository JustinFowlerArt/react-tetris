import { useEffect, useRef, useState } from 'react';
import Canvas from './canvas';
import { checkCollisions } from './checkCollisions';
import { checkCollision, gameHeight, gameWidth } from './utilities';

interface Props {
	width: number;
	height: number;
}

export interface iBlock {
	id: number;
	xPosition: number;
	yPosition: number;
	rotation: number;
	// subBlocks: Array<iSubBlock>;
}

// export interface iSubBlock {
// 	xPosition: number;
// 	yPosition: number;
// }

export const Game = ({ width, height }: Props) => {
	// const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);

	const [leftOpen, setLeftOpen] = useState(true);
	const leftRef = useRef(leftOpen);
	leftRef.current = leftOpen;

	const [rightOpen, setRightOpen] = useState(true);
	const rightRef = useRef(rightOpen);
	rightRef.current = rightOpen;

	const [blocks, setBlocks] = useState<Array<iBlock>>([]);

	const [counter, setCounter] = useState(0);
	const countRef = useRef(counter);
	countRef.current = counter;

	// const [spaceAvailable, setSpaceAvailable] = useState(true);

	const [xPosition, setXPosition] = useState(0);
	const xPositionRef = useRef(xPosition);
	xPositionRef.current = xPosition;

	const [yPosition, setYPosition] = useState(100 - gameHeight);
	const yPositionRef = useRef(yPosition);
	yPositionRef.current = yPosition;

	const [rotation, setRotation] = useState(0);
	const rotationRef = useRef(rotation);
	rotationRef.current = rotation;

	const activeBlock = {
		x1: xPosition - 32,
		y1: yPosition - 32,
		x2: xPosition + 32,
		y2: yPosition + 33,
	};

	const updateBlocks = () => {
		setBlocks([
			...blocks,
			{
				id: counter,
				xPosition: xPosition,
				yPosition: yPosition,
				rotation: rotation,
				// subBlocks: [{ xPosition, yPosition }],
			},
		]);
		setCounter(counter + 1);
		setXPosition(0);
		setYPosition(100 - gameHeight);
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
				setYPosition(yPosition => yPosition + 64);
			}, 1000);
			return () => {
				clearInterval(initializer);
			};
		}
	}, [blocks, gameOver]);

	useEffect(() => {
		if (!gameOver) {
            setLeftOpen(() => true);
			setRightOpen(() => true);
			checkCollisions(
				activeBlock,
				blocks,
				updateBlocks,
				setGameOver,
				setLeftOpen,
				setRightOpen
			);
		}
	}, [activeBlock, gameOver]);

	const handleKeyDown = (e: KeyboardEvent) => {
		const { key } = e;
		switch (key) {
			case 'a':
			case 'ArrowLeft':
				{
					if (xPositionRef.current > gameWidth / -2 && leftRef.current) {
						setXPosition(xPosition => xPosition - 64);
					}
				}
				break;
			case 'd':
			case 'ArrowRight':
				{
					if (xPositionRef.current < gameWidth / 2 - 64 && rightRef.current) {
						setXPosition(xPosition => xPosition + 64);
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
					setYPosition(yPosition => yPosition + 64);
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
			xPosition={xPosition}
			yPosition={yPosition}
			rotation={rotation}
		/>
		// <main className='flex flex-col justify-center items-center'>
		// 	<h1 className='text-3xl'>React Tetris</h1>
		// 	<h2 className='text-xl'>Score: {score}</h2>
		// 	<div className='flex flex-col items-center p-4'>
		// 		<div className='relative bg-slate-500 w-80 h-[40rem] m-4'>
		// 			<Block
		// 				xPosition={xPosition}
		// 				yPosition={yPosition}
		// 				rotation={rotation}
		// 			/>
		// 			{blocks?.map(block => (
		// 				<Block
		// 					key={block.id}
		// 					xPosition={block.xPosition}
		// 					yPosition={block.yPosition}
		// 					rotation={block.rotation}
		// 				/>
		// 			))}
		// 		</div>
		// 	</div>
		// </main>
	);
};
