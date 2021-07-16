let pinID = 0;

export const initPins = [];

export function validatePins(state) {
	const {
		general: {
			cutter: {dovetailDiameter, straightDiameter},
			material: {width},
		},
		pins,
		halfPins,
	} = state;

	function filterPin(pin, i, pins) {
		if (pin.maxWidth < dovetailDiameter + 0.1) {
			return false;
		}

		const halfPinFactor = halfPins.enabled ? halfPins.width : 0;
		const maxLeft = halfPinFactor;
		const maxRight = width - halfPinFactor;

		const left = pin.x - pin.maxWidth / 2;
		const right = pin.x + pin.maxWidth / 2;

		if (left < maxLeft || right > maxRight) {
			return false;
		}
		for (const otherPin of pins) {
			if (otherPin.id === pin.id) {
				continue;
			}

			const otherLeft = otherPin.x - otherPin.maxWidth / 2;
			const otherRight = otherPin.x + otherPin.maxWidth / 2;
			const margin = otherPin.x > pin.x
				? otherLeft - right
				: left - otherRight;
			if (straightDiameter - margin > 0.0001) {
				return false;
			}
		}

		return true;
	}

	return {...state, pins: pins.filter(filterPin)};
}

export function reducePins(state, action) {
	switch (action.type) {
		case 'add':
			const deselected = state.map(
				(p, i, ps) => ({...p, selected: false}),
			);
			const id = pinID;
			pinID += 2;
			return [
				...deselected,
				{id, selected: true, ...action.pin},
			];

		case 'update':
			let existing = [...state];
			if (action.delta.selected) {
				existing = existing.map(
					(p, i, ps) => ({...p, selected: false}),
				);
			}

			return existing.map(
				(p, i, ps) => {
					if (p.id === action.id) {
						return {...p, ...action.delta};
					} else {
						return p;
					}
				},
			);

		case 'delete':
			return state.filter((p, i, ps) => p.id !== action.id);

		default:
			return state;
	}
}

export function add(x, maxWidth) {
	return {type: 'pins:add', pin: {x, maxWidth}};
}

export function update(id, delta) {
	return {type: 'pins:update', id, delta};
}

export function remove(id) {
	return {type: 'pins:delete', id};
}
