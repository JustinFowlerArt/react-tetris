import { Cell } from './cell';
import { IStage } from './gameHelpers'

export const Stage = ({ stage }: { stage: IStage }) => {
	return (
		<div className='grid grid-cols-12 gap-0 auto-cols w-3/4 md:w-1/3 border border-slate-400'>
			{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0 as keyof typeof Cell]} />))}
		</div>
	);
};
