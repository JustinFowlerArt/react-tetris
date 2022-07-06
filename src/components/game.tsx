import { useEffect, useRef, useState } from 'react';
import { ActiveBlock } from './activeBlock';

interface Block {
	id: number;
	position: { x: number; y: number };
	rotation: number;
}

export const Game = () => {
	const [score, setScore] = useState(0);
	const [activeBlock, setActiveBlock] = useState<Block>({
		id: 0,
		position: { x: 8, y: 0 },
		rotation: 0,
	});
	// const [blocks, setBlocks] = useState<Array<Block>>([]);
	const [counter, setCounter] = useState(1);

	const countRef = useRef(counter);
	countRef.current = counter;

	useEffect(() => {
		const initializer = setInterval(() => {
			const updatedBlock = copyBlock();
			if (countRef.current < 20) {
				updatedBlock.position.x = activeBlock.position.x;
				updatedBlock.position.y = activeBlock.position.y += 2;
				setCounter(counter => counter + 1);
			} else {
				updatedBlock.id += 1;
				updatedBlock.position.x = activeBlock.position.x = 8;
				updatedBlock.position.y = activeBlock.position.y = 0;
				updatedBlock.rotation = 0;
				setCounter(counter => counter - 19);
			}
			setActiveBlock(updatedBlock);
		}, 1000);
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			clearInterval(initializer);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const copyBlock = () => {
		const blockCopy: Block = {
			...activeBlock,
			position: { ...activeBlock.position },
		};
		return blockCopy;
	};

	const handleClick = (): void => {
		const updatedBlock = copyBlock();
		updatedBlock.rotation += 90;
		setActiveBlock(updatedBlock);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		const { key } = e;
		console.log(key);
		switch (key) {
			case 'a':
			case 'ArrowLeft':
				{
					const updatedBlock = copyBlock();
					updatedBlock.position.x -= 2;
					setActiveBlock(updatedBlock);
				}
				break;
			case 'd':
			case 'ArrowRight':
				{
					const updatedBlock = copyBlock();
					updatedBlock.position.x += 2;
					setActiveBlock(updatedBlock);
				}
				break;
			case 'w':
			case 'ArrowUp':
				{
					const updatedBlock = copyBlock();
					updatedBlock.rotation -= 90;
					setActiveBlock(updatedBlock);
				}
				break;
			case 's':
			case 'ArrowDown':
				{
					const updatedBlock = copyBlock();
					updatedBlock.rotation += 90;
					setActiveBlock(updatedBlock);
				}
				break;
			default:
				break;
		}
	};

	return (
		<main className='flex justify-center items-center'>
			<div className='flex flex-col items-center p-4'>
				<h1 className='text-3xl'>React Tetris</h1>
				<h2 className='text-xl'>Score: {score}</h2>
				<h2 className='text-xl'>Counter: {counter}</h2>
				<div className='relative bg-slate-500 w-80 h-[40rem] m-4'>
					<ActiveBlock
						key={activeBlock.id}
						id={activeBlock.id}
						position={activeBlock.position}
						rotation={activeBlock.rotation}
						handleClick={handleClick}
					/>
					{/* {blocks?.map(block => (
						<Block
							key={block.id}
							id={block.id}
							position={block.position}
							rotation={block.rotation}
							handleClick={handleClick}
						/>
					))} */}
					<div className='absolute bottom-0 w-80'></div>
				</div>
			</div>
		</main>
	);
};
