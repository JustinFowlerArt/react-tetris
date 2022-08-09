import { iBlock } from './game';
import { checkCollision, gameHeight, gameWidth } from './utilities';

export const checkCollisions = (
	activeBlock: {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
	},
	blocks: iBlock[],
	updateBlocks: () => void,
	setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
	setLeftOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setRightOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const activeLeftCollider = {
		...activeBlock,
		x1: activeBlock.x1 - 1,
		y2: activeBlock.y2 - 1,
	};

	const activeRightCollider = {
		...activeBlock,
		x2: activeBlock.x2 + 1,
		y2: activeBlock.y2 - 1,
	};

	const ground = {
		x1: gameWidth / -2,
		y1: 36,
		x2: gameWidth / 2,
		y2: 100,
	};

	if (checkCollision(activeBlock, ground)) {
		updateBlocks();
		return;
	}

	blocks?.forEach(block => {
		const blockCollider = {
			x1: block.xPosition - 32,
			y1: block.yPosition - 32,
			x2: block.xPosition + 32,
			y2: block.yPosition + 33,
		};
		if (block.yPosition === 100 - gameHeight) {
			setGameOver(true);
		}
		if (checkCollision(activeLeftCollider, blockCollider)) {
			setLeftOpen(false);
		}
		if (checkCollision(activeRightCollider, blockCollider)) {
			setRightOpen(false);
		}
		if (checkCollision(activeBlock, blockCollider)) {
			updateBlocks();
			return;
		}
	});
};
