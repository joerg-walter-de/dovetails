


const MM_PER_INCH = 25.4;

interface JointSegment {
    index: number;
    type:   'start_half_pin' |
            'start_half_tail' |
            'tail' |
            'pin' |
            'end_half_pin' |
            'end_half_tail'
        ;

    startX: number;
    endX: number;
    angle_deg: number;

};

enum LengthUnit {
	MM = 'mm',
	Inch = 'inch',
};

interface ConstructConfig {
    materialWidth: number;
    materialThickness: number;
    lengthUnit: LengthUnit;
};

interface LayoutConfig {
    createHalfPins:  boolean;
    halfPinWidth: number;
    angle_deg: number;
    layoutType:
        'fixed_offset' |
        'fixed_pin_width' |
        'fixed_tail_width' |
        'even_spacing'
        ;

    layoutParams: {
        pinWidth: number;
        tailWidth: number;
        tailsCount: number;
    }
};

class Joint {

        mMaterialWidth: number;
        mMaterialThickness: number;
        mSegments: JointSegment[];
        mLengthUnit: LengthUnit;

    constructor(config: ConstructConfig)
    {
        this.mMaterialThickness = config.materialThickness;
        this.mLengthUnit = config.lengthUnit;
        this.mMaterialWidth = config.materialWidth;
        this.mSegments = [];
    }

    layout(config: LayoutConfig)
    {
        let currentX: number = 0;
        let currentSectionIndex=0;

        let fullTailsCount =
            config.createHalfPins ?
                config.layoutParams.tailsCount
                :
                config.layoutParams.tailsCount -2
            ;

        // determine widths
        let tailWidth = config.layoutParams.tailWidth;
        let pinWidth = config.layoutParams.pinWidth;

        const pinMaterialWidth = this.mMaterialWidth -
            (config.layoutParams.tailsCount * config.layoutParams.tailWidth);

        switch(config.layoutType)
        {
            case 'even_spacing':
                break;
            case 'fixed_offset':
                break;
            case 'fixed_pin_width':

                tailWidth =
                    (this.mMaterialWidth - pinMaterialWidth) / config.layoutParams.tailsCount;

                break;
            case 'fixed_tail_width':
                if(config.createHalfPins)
                {
                    pinWidth = pinMaterialWidth / config.layoutParams.tailsCount;
                }
                else
                {
                    pinWidth = pinMaterialWidth / (config.layoutParams.tailsCount - 1);
                }
                break;
        }

        if(config.createHalfPins)
        {
            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'start_half_pin',
                startX: currentX,
                endX: currentX + config.halfPinWidth,
                angle_deg: config.angle_deg
            });
            currentX = currentX + config.halfPinWidth;
        }
        else
        {
            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'start_half_tail',
                startX: currentX,
                endX: currentX + tailWidth / 2.0,
                angle_deg: config.angle_deg
            });
            currentX = currentX + tailWidth / 2.0;

            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'pin',
                startX: currentX,
                endX: currentX + pinWidth,
                angle_deg: config.angle_deg
            });
            currentX = currentX + pinWidth;

        }

        //  full tails and pins in between
        for(let tailIndex = 0; tailIndex < fullTailsCount; tailIndex++)
        {
            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'tail',
                startX: currentX,
                endX: currentX + tailWidth,
                angle_deg: config.angle_deg
            });
            currentX = currentX + tailWidth;

            if(tailIndex+1 < fullTailsCount)
            {
                this.mSegments.push({
                    index: currentSectionIndex++,
                    type: 'pin',
                    startX: currentX,
                    endX: currentX + pinWidth,
                    angle_deg: config.angle_deg
                });
                currentX = currentX + tailWidth;
            }
        }

        if(config.createHalfPins)
        {
            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'end_half_pin',
                startX: currentX,
                endX: this.mMaterialWidth,
                angle_deg: config.angle_deg
            });
            currentX = this.mMaterialWidth;
        }
        else
        {
            this.mSegments.push({
                index: currentSectionIndex++,
                type: 'end_half_tail',
                startX: currentX,
                endX: this.mMaterialWidth,
                angle_deg: config.angle_deg
            });
            currentX = this.mMaterialWidth;
        }

    }
};

export {
    Joint,
    LengthUnit,
    MM_PER_INCH
};

export type {
    JointSegment,
    LayoutConfig,
    ConstructConfig,
};