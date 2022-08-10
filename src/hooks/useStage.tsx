import { useEffect, useState } from 'react';
import { Cell } from '../components/cell';
import { clearCell, createStage, IStage } from '../components/gameHelpers';
import { Player } from './usePlayer';

export const useStage = (player: Player, resetPlayer: () => void) => {
	const [stage, setStage] = useState<IStage>(createStage());

	useEffect(() => {
		const updateStage = (prevStage: IStage): IStage => {
			// First flush the stage
			const newStage: IStage = prevStage.map(row =>
				row.map(cell =>
					cell[1 as keyof typeof Cell] === 'clear' ? clearCell : cell
				)
			);

			// Then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
						];
					}
				});
			});

			return newStage;
		};

		setStage(prev => updateStage(prev));
	}, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

	return { stage, setStage };
};
