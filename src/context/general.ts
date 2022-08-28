import {z} from 'zod';

export enum Kind {
	Through = 'through',
	Half = 'half',
}

export enum Unit {
	MM = 'mm',
	Inch = 'inch',
};

const CutterSchema = z.object(
	{
		dovetailDiameter: z.number(),
		straightDiameter: z.number(),
		height: z.number(),
		angle: z.number(),
	},
);
type Cutter = z.infer<typeof CutterSchema>;

const MaterialSchema = z.object(
	{
		thickness: z.number(),
		width: z.number(),
		dovetailLength: z.number(),
	},
);
type Material = z.infer<typeof MaterialSchema>;

const ContextSchema = z.object(
	{
		kind: z.nativeEnum(Kind),
		unit: z.nativeEnum(Unit),
		cutter: CutterSchema,
		material: MaterialSchema,
	},
);
type ContextGeneral = z.infer<typeof ContextSchema>;


enum Action {
	SetKind = 'setKind',
	SetUnit = 'setUnit',
	SetCutter = 'setCutter',
	SetMaterial = 'setMaterial',
}

export const initGeneral: ContextGeneral = {
	kind: Kind.Through,
	unit: Unit.MM,
	cutter: {
		dovetailDiameter: 12.7,
		straightDiameter: 6.35,
		height: 12.7,
		angle: 14,
	},
	material: {
		thickness: 10,
		width: 100,
		dovetailLength: 10,
	},
};

export function reduceGeneral(state: ContextGeneral, action: GeneralAction) {
	switch (action.type) {
		case Action.SetKind:
			let materialComponent = {};
			if (action.kind === 'half') {
				materialComponent = {
					material: {
						...state.material,
						thickness: state.material.thickness * 2 / 3,
						dovetailLength: state.material.thickness,
					},
				};
			}
			return {
				...state,
				kind: action.kind,
				...materialComponent,
			};
		case Action.SetUnit:
			return {...state, unit: action.unit};
		case Action.SetCutter:
			return {...state, cutter: {...state.cutter, ...action.cutter}};
		case Action.SetMaterial:
			return {
				...state,
				material: {...state.material, ...action.material},
			};
		default:
			return state;
	}
}

type KindAction = {store: 'general', type: Action.SetKind, kind: Kind};
export function setKind(kind: Kind): KindAction {
	return {store: 'general', type: Action.SetKind, kind};
}

type UnitAction = {store: 'general', type: Action.SetUnit, unit: Unit};
export function setUnit(unit: Unit): UnitAction {
	return {store: 'general', type: Action.SetUnit, unit};
}

type CutterAction = {
	store: 'general',
	type: Action.SetCutter,
	cutter: Cutter,
};
export function setCutter(cutter: Cutter): CutterAction {
	return {store: 'general', type: Action.SetCutter, cutter};
}

type MaterialAction = {
	store: 'general',
	type: Action.SetMaterial,
	material: Material,
};
export function setMaterial(material: Material): MaterialAction {
	return {store: 'general', type: Action.SetMaterial, material};
}

export type GeneralAction = (
	KindAction |
		UnitAction |
		CutterAction |
		MaterialAction
);
