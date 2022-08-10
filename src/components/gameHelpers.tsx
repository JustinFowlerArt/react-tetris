import { IStage, ICell, IPlayer } from './types';

export const clearCell: ICell = [0, 'clear'];

export const stageHeight = 20;

export const stageWidth = 12;

export const createStage = (): IStage =>
	Array.from(Array(stageHeight), () => new Array(stageWidth).fill(clearCell));

export const checkCollision = (
	player: IPlayer,
	stage: IStage,
	{ x: moveX, y: moveY }: { x: number; y: number }
) => {
	for (let y = 0; y < player.tetromino.length; y++) {
		for (let x = 0; x < player.tetromino[y].length; x++) {
			// 1. Check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0) {
				if (
					// 2. Check that our move is inside game area's height (y)
					!stage[y + player.pos.y + moveY] ||
					// 3. Check that our move is inside game area's width (x)
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					// 4. Check that the cell we are moving to isn't set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				) {
					return true;
				}
			}
		}
	}
};
