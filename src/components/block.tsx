interface Props {
	position: { x: number; y: number };
	rotation: number;
}

export const Block = ({ position, rotation }: Props) => {
	return (
		// <rect
		// 	x={xPosition}
		// 	y={yPosition}
		// 	width={64}
		// 	height={256}
		// 	transform={`rotate(${rotation}, ${xPosition}, ${yPosition + 128})`}
		// />
		<g transform={`rotate(${rotation}, ${position.x + 64}, ${position.y + 64})`}>
			<svg x={position.x} y={position.y}>
				<rect fill='blue' x={0} y={0} width={64} height={64}></rect>
				{/* <rect fill='blue' x={64} y={0} width={64} height={64}></rect>
				<rect fill='blue' x={64} y={64} width={64} height={64}></rect>
				<rect fill='blue' x={64} y={128} width={64} height={64}></rect> */}
			</svg>
		</g>
	);
};
