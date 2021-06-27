import {useRef, useState, useLayoutEffect} from 'react';
import {Stage, Layer, Rect} from 'react-konva';

function useSize(target) {
	const [size, setSize] = useState();
	useLayoutEffect(
		() =>  setSize(
			target.current && target.current.getBoundingClientRect(),
		),
		[target],
	);
	useLayoutEffect(
		() => {
			const elem = target.current;
			if (!elem) {
				return;
			}

			const resizeObserver = new ResizeObserver(
				() => setSize(elem.getBoundingClientRect()),
			);
			resizeObserver.observe(elem);

			return () => resizeObserver.unobserve(elem);
		},
		[target],
	);

	return size;
}


export default function Visualizer() {
	const target = useRef(null);
	const size = useSize(target);


	let stage = null;
	if (size) {
		stage = (
			<Stage width={size.width} height={size.height} fill="red">
				<Layer>
					<Rect width={100} height={100} fill="green" draggable />
				</Layer>
			</Stage>
		);
	}

	return (
		<div ref={target} className="Visualizer">
			{stage}
		</div>
	);
}
