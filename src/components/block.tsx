interface Props {
	xPosition: number;
	yPosition: number;
	rotation: number;
}

export const Block = ({ xPosition, yPosition, rotation }: Props) => {
	const dynamicStyles = {
		left: `${xPosition}rem`,
		top: `${yPosition}rem`,
		transform: `rotate(${rotation}deg)`,
	};

	return (
		<div className='absolute bg-green-500 w-16 h-8' style={dynamicStyles}></div>
	);
};
