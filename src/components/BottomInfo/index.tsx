import React from 'react';
import styled from 'styled-components';

const formatNumber = (number: number, decimalPlaces: number = 2) =>
	number
		.toFixed(decimalPlaces)
		.toString()
		.split(/(?=(?:\d{3})+(?:\.|$))/g)
		.join(',');

type PercentageType = 'up' | 'down';

const LabelStyled = styled.div`
	color: #fff;
	font-size: 13px;
`;

const AmountStyled = styled.div`
	color: #fff;
	font-weight: 600;
	font-size: 30px;
`;

const PercentageStyled = styled.div<{ percentageType: PercentageType }>`
	color: ${(prop) => (prop.percentageType == 'down' ? '#f0252c' : '#7AE34C')};
	font-weight: 500;
`;

export interface IBottomInfoProps {
	label: string;
	amount: number;
	percentage: number;
	percentageType: PercentageType;
}

const BottomInfo: React.FC<IBottomInfoProps> = ({
	label,
	amount = 0,
	percentage = 0,
	percentageType,
	...props
}) => {
	return (
		<div className="mt-10" {...props}>
			<LabelStyled>{label}</LabelStyled>
			<AmountStyled>{formatNumber(amount)}</AmountStyled>
			<PercentageStyled percentageType={percentageType}>
				{percentage.toFixed(2)}
			</PercentageStyled>
		</div>
	);
};

export default BottomInfo;
