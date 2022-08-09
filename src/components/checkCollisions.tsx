import { iBlock } from './game';
import { checkCollision, gameHeight, gameWidth } from './gameHelpers';

export const checkCollisions = (
	updateBlock: () => {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
	},
	blocks: iBlock[],
	updateBlocks: () => void,
	setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
	setOpenSpace: React.Dispatch<
		React.SetStateAction<{
			left: boolean;
			right: boolean;
		}>
	>
) => {
	const activeBlock = updateBlock();
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
			x1: block.position.x - 32,
			y1: block.position.y - 32,
			x2: block.position.x + 32,
			y2: block.position.y + 33,
		};
		if (block.position.y === 100 - gameHeight) {
			setGameOver(true);
		}
		if (checkCollision(activeLeftCollider, blockCollider)) {
			setOpenSpace(
				openSpace => (openSpace = { left: false, right: openSpace.right })
			);
		}
		if (checkCollision(activeRightCollider, blockCollider)) {
			setOpenSpace(
				openSpace => (openSpace = { left: openSpace.left, right: false })
			);
		}
		if (checkCollision(activeBlock, blockCollider)) {
			updateBlocks();
			return;
		}
	});
};
