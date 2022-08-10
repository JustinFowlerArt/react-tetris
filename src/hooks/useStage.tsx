import { useEffect, useState } from 'react';
import { clearCell, createStage } from '../components/gameHelpers';
import { IStage, IPlayer } from '../components/types';

export const useStage = (player: IPlayer, resetPlayer: () => void) => {
	const [stage, setStage] = useState<IStage>(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {
		setRowsCleared(0);

		const sweepRows = (newStage: IStage) =>
			newStage.reduce((ack: IStage, row) => {
				if (row.findIndex(cell => cell[0] === 0) === -1) {
					setRowsCleared(prev => prev + 1);
					ack.unshift(new Array(newStage[0].length).fill(clearCell));
					return ack;
				}
				ack.push(row);
				return ack;
			}, []);

		const updateStage = (prevStage: IStage): IStage => {
			// First flush the stage
			const newStage: IStage = prevStage.map(row =>
				row.map(cell =>
					cell[1] === 'clear' ? clearCell : cell
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
			// Then check if we collided
			if (player.collided) {
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		};

		setStage(prev => updateStage(prev));
	}, [player, resetPlayer]);

	return { stage, setStage, rowsCleared };
};
