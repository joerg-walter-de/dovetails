import {createContext, useContext, useReducer} from 'react';

import {initGeneral, reduceGeneral} from './general';
import {initGuides, reduceGuides} from './guides';
import {initHalfPins, reduceHalfPins, validateHalfPins} from './halfPins';
import {initPins, reducePins, validatePins} from './pins';

const Context = createContext();
const VALIDATIONS = [
	validatePins,
	validateHalfPins,
];

export function useStore() {
	return useContext(Context);
}

export function StoreProvider({children}) {
	const [store, dispatch] = useReducer(
		(state, action) => {
			let newState = state;
			let subAction = {...action, type: action.type.split(':')[1]};

			switch (action.type.split(':')[0]) {
				case 'general':
					newState = {
						...state,
						general: reduceGeneral(state.general, subAction),
					};
					break;
				case 'guides':
					newState = {
						...state,
						guides: reduceGuides(state.guides, subAction),
					};
					break;
				case 'pins':
					newState = {
						...state,
						pins: reducePins(state.pins, subAction),
					};
					break;
				case 'halfPins':
					newState = {
						...state,
						halfPins: reduceHalfPins(state.halfPins, subAction),
					};
					break;
				default:
					return state;
			}

			for (const validation of VALIDATIONS) {
				newState = validation(newState);
			}
			return newState;
		},
		{
			general: initGeneral,
			guides: initGuides,
			halfPins: initHalfPins,
			pins: initPins,
		},
	);

	return (
		<Context.Provider value={[store, dispatch]}>
			{children}
		</Context.Provider>
	);
}
