import {Line} from 'react-konva';

export default function Guide(props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		pixelsPerMM,
		x,
	} = props;

	const pxWidth = materialWidth * pixelsPerMM;
	const pxPosition = x * pixelsPerMM + (viewWidth - pxWidth) / 2;
	const color = Math.abs(x - materialWidth / 2) < 0.01 ? 'black' : 'gray';

	return (
		<Line
			x={pxPosition}
			y={0}
			points={[0, 0, 0, viewHeight]}
			stroke={color}
			strokeWidth={1}
			dash={[10, 5]}
			dashEnabled
		/>
	);
}
