import { Background } from './background';
import { Ground } from './ground';
import { iBlock } from './/game';
import { Block } from './block';

interface Props {
	width: number;
	height: number;
	blocks: iBlock[];
	position: { x: number; y: number };
	rotation: number;
}

const Canvas = ({ width, height, blocks, position, rotation }: Props) => {
	const viewBox = [width / -2, 100 - height, width, height];

	return (
		<svg
			id='canvas'
			preserveAspectRatio='xMaxYMax meet'
			viewBox={viewBox.toString()}
		>
			<Background />
			<Block position={position} rotation={rotation} />
			{blocks?.map(block => (
				<Block
					key={block.id}
					position={block.position}
					rotation={block.rotation}
				/>
			))}
			<Ground />
		</svg>
	);
};

export default Canvas;
