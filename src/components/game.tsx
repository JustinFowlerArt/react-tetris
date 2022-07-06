import { useEffect, useRef, useState } from 'react';
import { Block } from './block';
import { checkCollision } from './utilities';

interface Block {
	id: number;
	xPosition: number;
	yPosition: number;
	rotation: number;
}

export const Game = () => {
	const [score, setScore] = useState(0);

	const [counter, setCounter] = useState(0);
	const countRef = useRef(counter);
	countRef.current = counter;

	const [blocks, setBlocks] = useState<Array<Block>>([]);

	const [xPosition, setXPosition] = useState(8);
	const xPositionRef = useRef(xPosition);
	xPositionRef.current = xPosition;

	const [yPosition, setYPosition] = useState(0);
	const yPositionRef = useRef(yPosition);
	yPositionRef.current = yPosition;

	const [rotation, setRotation] = useState(0);
	const rotationRef = useRef(rotation);
	rotationRef.current = rotation;

	useEffect(() => {
		const initializer = setInterval(() => {
			setYPosition(yPosition => yPosition + 2);
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
		setXPosition(8);
		setYPosition(0);
		setRotation(0);
	};

	const activeBlock = {
		x1: xPosition,
		y1: yPosition,
		x2: xPosition + 4,
		y2: yPosition + 4,
	};

	const floor = {
		x1: 0,
		y1: 40,
		x2: 20,
		y2: 40,
	};

	if (checkCollision(activeBlock, floor)) {
		updateBlocks();
	}

	blocks?.forEach(block => {
		const blockLocation = {
			x1: block.xPosition,
			y1: block.yPosition,
			x2: block.xPosition + 4,
			y2: block.yPosition + 4,
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
					if (xPositionRef.current > 0) {
						setXPosition(xPosition => xPosition - 2);
					}
				}
				break;
			case 'd':
			case 'ArrowRight':
				{
					if (xPositionRef.current < 16) {
						setXPosition(xPosition => xPosition + 2);
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
					setYPosition(yPosition => yPosition + 2);
				}
				break;
			}
			default:
				break;
		}
	};

	return (
		<main className='flex justify-center items-center'>
			<div className='flex flex-col items-center p-4'>
				<h1 className='text-3xl'>React Tetris</h1>
				<h2 className='text-xl'>Score: {score}</h2>
				<div className='relative bg-slate-500 w-80 h-[40rem] m-4'>
					<Block
						xPosition={xPosition}
						yPosition={yPosition}
						rotation={rotation}
					/>
					{blocks?.map(block => (
						<Block
							key={block.id}
							xPosition={block.xPosition}
							yPosition={block.yPosition}
							rotation={block.rotation}
						/>
					))}
				</div>
			</div>
		</main>
	);
};
