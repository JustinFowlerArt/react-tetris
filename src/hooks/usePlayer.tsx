import { useCallback, useState } from 'react';
import { stageWidth } from '../components/gameHelpers';
import { randomTetromino, TetrominoShape } from '../components/tetrominos';

export type Player = {
    pos: { x: number, y: number },
    tetromino: TetrominoShape,
    collided: false,
}

export const usePlayer = () => {
	const [player, setPlayer] = useState<Player>({
		pos: { x: stageWidth / 2 - 2, y: 0 },
		tetromino: randomTetromino().shape,
		collided: false,
	});

	const updatePlayerPos = (x: number, y: number, collided: boolean) => {
		setPlayer(prev => ({
            ...prev, pos: {x: (prev.pos.x += x), y: (prev.pos.y += y), collided}
        }));
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: stageWidth / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
		});
	}, []);

	return { player, updatePlayerPos, resetPlayer };
};
