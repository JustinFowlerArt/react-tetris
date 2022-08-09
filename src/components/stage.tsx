import { Cell } from './cell';

type Cells = number | string[];

export const Stage = ({ stage }: { stage: Cells[][] }) => {
	return (
		<div className='grid grid-cols-12 gap-0 auto-cols w-3/4 md:w-1/3 border border-slate-400'>
			{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
		</div>
	);
};
