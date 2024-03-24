import {useStore} from '../context/store';
import React from 'react';
import {useLimits} from '../util/limits';

import {Form, FormSection, TextRow } from './Form';
import { useEffect } from 'react';
export default function Readings() {

	let pinsDistances: { fromIndex: number, toIndex: number, distance: number}[] = [];
	let tailsDistances: { isStartHalfTail: boolean, isEndHalfTail: boolean, fromIndex: number, toIndex: number, distance: number}[] = [];

	const [
		{
			general: {material: {width: materialWidth}},
			pins,
			halfPins,
		},
	] = useStore();

	const calcDistances = () => {
		pinsDistances = [];
		tailsDistances =  [];

		for(let i=0;i<pins.length-1;i++)
		{
	//		console.log(JSON.stringify(pins[i]))
			pinsDistances.push(
				{
					fromIndex: i,
					toIndex: i+1,
					distance: pins[i+1].x - pins[i].x
				}
			);
		}

		// if(halfPins.enabled && pins.length > 1)
		// {
		// 	for(let i=0;i<pins.length-2;i++)
		// 	{
		// 		console.log(JSON.stringify(pins[i]))
		// 		tailsDistances.push(
		// 			{
		// 				fromIndex: i,
		// 				toIndex: i+1,
		// 				isStartHalfTail: false,
		// 				isEndHalfTail: false,
		// 				distance: halfPins.width + i*(pins[i+1].x - pins[i].x)
		// 			}
		// 		);
		// 	}

		// }
		// else if (pins.length > 2)
		// {
		// 	for(let i=0;i<pins.length-2;i++)
		// 	{
		// 		console.log(JSON.stringify(pins[i]))
		// 		tailsDistances.push(
		// 			{
		// 				fromIndex: i,
		// 				toIndex: i+1,
		// 				isStartHalfTail: i===0,
		// 				isEndHalfTail:  i === pins.length-3,
		// 				distance: halfPins.width + i*(pins[i+1].x - pins[i].x)
		// 			}
		// 		);
		// 	}

		// }
	};


	calcDistances();

	useEffect(() => {
	//	console.log(JSON.stringify(pins))
		calcDistances();
	//	console.log("useEffect " + JSON.stringify(pinsDistances))
	}, [pins]);

	const {pins: {minSpacing}} = useLimits();

	let widthMax = materialWidth / 2 - minSpacing / 2;
	for (const {x, maxWidth} of pins) {
		const leftEdge = x - maxWidth / 2 - minSpacing;
		const rightEdge = x + maxWidth / 2 + minSpacing;
		widthMax = Math.min(widthMax, leftEdge, materialWidth - rightEdge);
	}

	function onUpdate(tailsDistance: number) {
		;
	}

	//console.log("main " + JSON.stringify(pinsDistances))

	return (
		<div className="Block Settings">
			<Form>
				<FormSection>
					Measurements
				</FormSection>
				<FormSection>
				{
					React.Children.toArray(
					pinsDistances.map((distance, index) => {
				//		console.log('test');
						return <TextRow
							id="tails_distance_input"
							label={`Pin  ${distance.fromIndex+1} 🔴 -> Pin ${distance.toIndex+1} 🔴 Distance `}
							value={distance.distance}
							key={index}
							readOnly={true}
							onChange={onUpdate}
						/>
					}
					)
				)}
				{/* {
					React.Children.toArray(
					tailsDistances.map((distance, index) => {
						console.log('test');
						return <TextRow
							id="tails_distance_input"
							label={`${distance.isStartHalfTail ? 'Half ' : ''}Tail  ${distance.fromIndex+1} -> ${distance.isEndHalfTail ? 'Half ' : ''}Tail ${distance.toIndex+1} Distance `}
							value={distance.distance}
							key={index}
							readOnly={true}
							onChange={onUpdate}
						/>
					}
					)
				)} */}

			</FormSection>

			</Form>
		</div>
	);
}
