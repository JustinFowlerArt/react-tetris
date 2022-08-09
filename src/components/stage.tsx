import { Cell } from './cell';

type Cells = number | string[];

export const Stage = ({ stage }: { stage: Cells[][] }) => {
	return (
		<div>
			{/* {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))} */}
		</div>
	);
};
