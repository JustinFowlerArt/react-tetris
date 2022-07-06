interface Props {
	id: number;
	position: { x: number; y: number };
	rotation: number;
	handleClick: () => void;
}

export const ActiveBlock = ({ position, rotation, handleClick }: Props) => {
	const dynamicStyles = {
		left: `${position.x}rem`,
		top: `${position.y}rem`,
		transform: `rotate(${rotation}deg)`,
	};

	return (
		<button
			type='button'
			className='absolute bg-green-500 w-16 h-8'
			style={dynamicStyles}
			onMouseDown={() => handleClick()}
		></button>
	);
};
