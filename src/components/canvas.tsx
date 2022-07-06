import { Background } from './background';
import { Ground } from './ground';
import { iBlock } from './/game';
import { Block } from './block';

interface Props {
	width: number;
	height: number;
	blocks: iBlock[];
	xPosition: number;
	yPosition: number;
	rotation: number;
}

const Canvas = ({
	width,
	height,
	blocks,
	xPosition,
	yPosition,
	rotation,
}: Props) => {
	const viewBox = [width / -2, 100 - height, width, height];

	return (
		<svg
			id='canvas'
			preserveAspectRatio='xMaxYMax meet'
			viewBox={viewBox.toString()}
		>
			<Background />
			<Block xPosition={xPosition} yPosition={yPosition} rotation={rotation} />
			{blocks?.map(block => (
				<Block
					key={block.id}
					xPosition={block.xPosition}
					yPosition={block.yPosition}
					rotation={block.rotation}
				/>
			))}
			<Ground />
		</svg>
	);
};

export default Canvas;
