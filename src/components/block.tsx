interface Props {
	xPosition: number;
	yPosition: number;
	rotation: number;
}

export const Block = ({ xPosition, yPosition, rotation }: Props) => {
	return (
		// <rect
		// 	x={xPosition}
		// 	y={yPosition}
		// 	width={64}
		// 	height={256}
		// 	transform={`rotate(${rotation}, ${xPosition}, ${yPosition + 128})`}
		// />
		<g transform={`rotate(${rotation}, ${xPosition + 64}, ${yPosition + 64})`}>
			<svg x={xPosition} y={yPosition}>
				<rect fill='blue' x={0} y={0} width={64} height={64}></rect>
				{/* <rect fill='blue' x={64} y={0} width={64} height={64}></rect>
				<rect fill='blue' x={64} y={64} width={64} height={64}></rect>
				<rect fill='blue' x={64} y={128} width={64} height={64}></rect> */}
			</svg>
		</g>
	);
};
