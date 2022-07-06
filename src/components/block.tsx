interface Props {
	xPosition: number;
	yPosition: number;
	rotation: number;
}

export const Block = ({ xPosition, yPosition, rotation }: Props) => {
	return (
		<rect
			x={xPosition}
			y={yPosition}
			width={64}
			height={256}
			transform={`rotate(${rotation}, ${xPosition}, ${yPosition})`}
		/>
	);
};
