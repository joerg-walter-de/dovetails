import {Rect} from 'react-konva';

type Props = {
	isStart: boolean;
	viewWidth: number;
	viewHeight: number;
	materialWidth: number;
	pixelsPerMM: number,

};
export default function BoardAnchorDotComponent(props: Props) {
	const {
		isStart,
		viewWidth,
		viewHeight,
		materialWidth,
		pixelsPerMM,
	} = props;

	console.log(JSON.stringify(props));

	const size = 6;
	const pxBoardWidth = materialWidth * pixelsPerMM;
	const pxBoardStart = (viewWidth - pxBoardWidth) / 2;

	return (
		<Rect
			x={isStart ? pxBoardStart  - size/2: pxBoardStart + pxBoardWidth - size/2}
			y={viewHeight * .2 - 2}
			width={size}
			height={size}
			fill="green"
		/>
	);
}
