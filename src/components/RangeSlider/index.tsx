import React from 'react';
import styled from 'styled-components';

const StepRangeSlider = require('react-step-range-slider').default;

const LabelStyled = styled.label`
	color: #fff;
	font-family: 'Roboto';
	padding-bottom: 5px;
	padding-left: 8px;
	font-size: 14px;
`;

const StepRangeSliderStyled = styled(StepRangeSlider)<{
	concatenatedString?: string;
}>`
	margin-top: 8px;

	.StepRangeSlider__tooltip {
		position: absolute;
		background: rgba(255, 255, 255, 0.4);
		padding: 2px 5px;
		border-radius: 8px;
		font-size: 13px;
		font-family: 'Roboto';
	}

	.StepRangeSlider__track {
		background-color: #fff;
		border: none;
	}

	.StepRangeSlider__thumb {
		background-color: #fff;
		border: none;
		box-shadow: 0 3px 12px #837f7f;
	}

	.StepRangeSlider__tooltip:after {
		content: '${(props) => props.concatenatedString}';
	}
`;

export interface IRangeSliderProps {
	concatenatedString?: string;
	range: any;
	label?: string;
	onChange?: (value: any) => void;
	value?: number;
}

const RangeSlider: React.FC<IRangeSliderProps> = ({
	range,
	concatenatedString,
	onChange,
	value,
	label,
	...props
}) => {
	return (
		<div>
			<LabelStyled>{label}</LabelStyled>
			<StepRangeSliderStyled
				{...props}
				value={value}
				range={range}
				concatenatedString={concatenatedString}
				onChange={onChange}
			/>
		</div>
	);
};

export default React.memo(RangeSlider);
