import {
    Joint,
    JointSegment,
    LengthUnit
} from './Joint';

interface LayoutConfig {
    createHalfPins:  boolean;
    halfPinWidth: number;
    materialWidth: number;
    materialThickness: number;
    lengthUnit: LengthUnit;
    angle_deg: number;
    layoutType: 'fixed_offset' | 'fixed_pin_width' | 'fixed_tail_width' | 'even_spacing'
};

function layout(config: LayoutConfig): Joint
{
    let joint: Joint  = {
        materialThickness: config.materialThickness,
        materialWidth: config.materialWidth,
        lengthUnit: config.lengthUnit,

        segments: []
    };

    let currentX: number = 0;

    if(config.createHalfPins)
    {
        joint.segments.push({
            index: 0,
            type: 'start_half_pin',
            startX: currentX,
            endX: currentX + config.halfPinWidth,
            angle_deg: config.angle_deg
        });
        currentX = currentX + config.halfPinWidth;
    }

    if(config.createHalfPins)
    {
        joint.segments.push({
            index: 0,
            type: 'end_half_pin',
            startX: currentX,
            endX: config.materialWidth,
            angle_deg: config.angle_deg
        });
        currentX = config.materialWidth;
    }

    return joint;
}

export {
    layout
};
