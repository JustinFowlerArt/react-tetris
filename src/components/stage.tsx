import Cell from './cell';
import { IStage } from './types';

export const Stage = ({ stage }: { stage: IStage }) => {
	return (
		<main className='grid grid-cols-12 gap-0 bg-slate-900 auto-cols w-3/4 xs:w-[60%] sm:w-7/12 md:w-1/2 lg:w-[40%] xl:w-1/4 border border-slate-400'>
			{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} status={cell[1]} />))}
		</main>
	);
};
