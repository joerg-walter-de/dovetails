import {Circle} from 'react-konva';

type Props = {
	viewWidth: number,
	viewHeight: number,
	materialWidth: number,
	pixelsPerMM: number,
	maxWidth: number,
	x: number,
	minX: number,
	maxX: number,
};
export default function PinAnchorDotComponent(props: Props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		pixelsPerMM,
		minX,
		maxX,
		x
	} = props;

	console.log(JSON.stringify(props));

	const pxBoardWidth = materialWidth * pixelsPerMM;
	const pxBoardStart = (viewWidth - pxBoardWidth) / 2;

	return (
		<Circle
			x={pxBoardStart + maxX * pixelsPerMM}
			y={viewHeight * .2}
			radius={3}
			fill="red"
		/>
	);
}
