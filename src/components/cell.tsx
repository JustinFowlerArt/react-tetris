import React from 'react';

const Cell = ({ type }: { type: string | number }) => {
	return (
		<div
			className={`aspect-square w-full ${
				type === 'I'
					? 'border-4 bg-yellow-600/80 border-yellow-400 border-b-yellow-400/10 border-l-yellow-400/30'
					: type === 'J'
					? 'border-4 bg-red-600/80 border-red-400 border-b-red-400/10 border-l-red-400/30'
					: type === 'L'
					? 'border-4 bg-blue-600/80 border-blue-400 border-b-blue-400/10 border-l-blue-400/30'
					: type === 'O'
					? 'border-4 bg-green-600/80 border-green-400 border-b-green-400/10 border-l-green-400/30'
					: type === 'S'
					? 'border-4 bg-purple-600/80 border-purple-400 border-b-purple-400/10 border-l-purple-400/30'
					: type === 'T'
					? 'border-4 bg-orange-600/80 border-orange-400 border-b-orange-400/10 border-l-orange-400/30'
					: type === 'Z'
					? 'border-4 bg-indigo-600/80 border-indigo-400 border-b-indigo-400/10 border-l-indigo-400/30'
					: 'border bg-slate-900 border-slate-800'
			}`}
		></div>
	);
};

export default React.memo(Cell);
