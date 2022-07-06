import { useEffect, useRef, useState } from 'react';
import Canvas from './canvas';
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
}

export const Game = ({ width, height }: Props) => {
	const [score, setScore] = useState(0);

	const [counter, setCounter] = useState(0);
	const countRef = useRef(counter);
	countRef.current = counter;

	const [blocks, setBlocks] = useState<Array<iBlock>>([]);

	const [xPosition, setXPosition] = useState(0);
	const xPositionRef = useRef(xPosition);
	xPositionRef.current = xPosition;

	const [yPosition, setYPosition] = useState(100 - gameHeight);
	const yPositionRef = useRef(yPosition);
	yPositionRef.current = yPosition;

	const [rotation, setRotation] = useState(0);
	const rotationRef = useRef(rotation);
	rotationRef.current = rotation;

	useEffect(() => {
		const initializer = setInterval(() => {
			setYPosition(yPosition => yPosition + 64);
		}, 1000);
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			clearInterval(initializer);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [blocks]);

	const updateBlocks = () => {
		setBlocks([
			...blocks,
			{
				id: counter,
				xPosition: xPosition,
				yPosition: yPosition,
				rotation: rotation,
			},
		]);
		setCounter(counter + 1);
		setXPosition(0);
		setYPosition(100 - gameHeight);
		setRotation(0);
	};

	const activeBlock = {
		x1: xPosition,
		y1: yPosition - 64,
		x2: xPosition + 64,
		y2: yPosition + 256,
	};

	const ground = {
		x1: gameWidth / -2,
		y1: 36,
		x2: gameWidth / 2,
		y2: 100,
	};

	if (checkCollision(activeBlock, ground)) {
		updateBlocks();
	}

	blocks?.forEach(block => {
		const blockLocation = {
			x1: block.xPosition,
			y1: block.yPosition - 64,
			x2: block.xPosition + 64,
			y2: block.yPosition + 256,
		};
		if (checkCollision(activeBlock, blockLocation)) {
			updateBlocks();
		}
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		const { key } = e;
		switch (key) {
			case 'a':
			case 'ArrowLeft':
				{
					if (xPositionRef.current > gameWidth / -2) {
						setXPosition(xPosition => xPosition - 64);
					}
				}
				break;
			case 'd':
			case 'ArrowRight':
				{
					if (xPositionRef.current < gameWidth / 2 - 64) {
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
