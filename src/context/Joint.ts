

export const MM_PER_INCH = 25.4;

interface JointSegment {
    index: number;
    type: 'start_half_pin' | 'tail' | 'pin' | 'end_half_pin';
    startX: number;
    endX: number;
    angle_deg: number;
};

enum LengthUnit {
	MM = 'mm',
	Inch = 'inch',
};

interface Joint {
    materialWidth: number;
    materialThickness: number;
    segments: JointSegment[];
    lengthUnit: LengthUnit;
};

export type {
    JointSegment,
    Joint,
    LengthUnit,
};