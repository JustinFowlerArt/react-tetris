interface Props {
	text: string;
	value?: number;
}

export const Display = ({ text, value }: Props) => {
	return (
		<div
			className={`h-min border bg-slate-900 border-slate-400 text-slate-400 rounded-xl py-2 px-4 sm:py-3 sm:px-6 sm:col-span-2 ${
				text === 'Game Over' && 'col-span-2 text-center'
			}`}
		>
			<span className={`${text === 'Game Over' && 'text-red-700'}`}>
				{text.toUpperCase()}
			</span>
            <span className='font-bold relative'>
                <div className='opacity-0 h-4 w-4 border border-white rounded-full absolute top-1 left-0 animate-ping-once'></div>
				{value}
			</span>
		</div>
	);
};
