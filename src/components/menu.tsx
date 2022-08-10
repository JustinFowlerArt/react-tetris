import { Stat } from './stat';

export const Menu = ({ startGame }: { startGame: () => void }) => {
	return (
		<aside className='flex flex-col space-y-4 w-48'>
			<Stat text='Score' value={0} />
			<Stat text='Rows' value={0} />
			<Stat text='Score' value={0} />
			<button className='bg-slate-400 text-slate-900 border rounded-xl py-3 px-6 font-bold hover:bg-slate-900 hover:border-slate-400 hover:text-slate-400' onClick={startGame}>Start Game</button>
		</aside>
	);
};
