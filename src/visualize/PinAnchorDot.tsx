import {Circle} from 'react-konva';

type Props = {
	viewWidth: number,
	viewHeight: number,
	materialWidth: number,
	materialThickness: number,
	pixelsPerMM: number,
	cutterAngle: number,
	maxWidth: number,
	x: number,
	bottomStartX: number,
	maxX: number,
	selected: boolean,
};
export default function PinAnchorDotComponent(props: Props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		materialThickness,
		pixelsPerMM,
		cutterAngle,
		maxWidth,
		x,
		bottomStartX,
		maxX,
		selected,
	} = props;

	console.log(JSON.stringify(props));

	const angleRad = 2 * cutterAngle * Math.PI / 360;
	const topStartX = bottomStartX + (
		2 * materialThickness * Math.tan(angleRad)
	);
	console.log(`bottomStartX: ${bottomStartX}`);
	console.log(`topStartX: ${topStartX}`);

	const pxBottomStartX = bottomStartX * pixelsPerMM;
	const pxTopStartX = topStartX * pixelsPerMM;

	const pxHeight = materialThickness * pixelsPerMM;

	const pxBoardWidth = materialWidth * pixelsPerMM;
	const pxBoardStart = (viewWidth - pxBoardWidth) / 2;

	return (
		<Circle
			x={pxBottomStartX}
			y={viewHeight * .2}
			radius={3}
			fill="red"
		/>
	);
}
