import { useCallback, useState } from 'react';
import { checkCollision, stageWidth } from '../components/gameHelpers';
import { tetrominos, randomTetromino } from '../components/tetrominos';
import { IPlayer, IStage, ITetrominoShape } from '../components/types';

export const usePlayer = () => {
	const [player, setPlayer] = useState<IPlayer>({
		pos: { x: 0, y: 0 },
		tetromino: tetrominos[0].shape,
		collided: false,
	});

	const rotate = (tetromino: ITetrominoShape, dir: number) => {
		// Make rows to become cols (transpose)
		const rotatedTetro = tetromino.map((_, index) =>
			tetromino.map(col => col[index])
		);
		// Reverse each row to gt a rotated Tetromino
		if (dir > 0) return rotatedTetro.map(row => row.reverse());
		return rotatedTetro.reverse();
	};

	const playerRotate = (stage: IStage, dir: number) => {
		const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

		const pos = clonedPlayer.pos.x;
		let offset = 1;
		while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > clonedPlayer.tetromino[0].length) {
				rotate(clonedPlayer.tetromino, -dir);
				clonedPlayer.pos.x = pos;
				return;
			}
		}
		setPlayer(clonedPlayer);
	};

	const updatePlayerPos = (x: number, y: number, collided = false) => {
		setPlayer(prev => ({
			...prev,
			pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
			collided,
		}));
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: stageWidth / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
		});
	}, []);

	return { player, updatePlayerPos, resetPlayer, playerRotate };
};
