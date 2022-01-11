import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	flex-direction: row;
	min-width: 200px;
	background: #ffffff68;
	border-radius: 50px;
	overflow: hidden;
	margin-bottom: 30px;
	position: relative;

	li {
		padding: 5px;
		flex-basis: 50%;
		flex-grow: 1;
	}

	li:not(.slider) {
		color: #fff;
	}

	li:not(.slider) > a {
		display: block;
		border-radius: 50px;
		padding: 10px 15px;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.slider {
		position: absolute;
		display: flex;
		background-color: black;
		height: 85%;
		width: 50%;
		z-index: 0;
		border-radius: 99px;
		transition: 0.25s ease-out;
		transform: translateX(-16px) scale(0.8) translateY(-2px);
	}

	li:not(.slider):nth-child(2).selected ~ .slider {
		transform: translateX(97%) scale(0.8) translateY(-2px);
	}
`;

type SwitchColumn = {
	label: string;
	onClick?: () => void;
};

export interface ISwitchProps {
	columns: SwitchColumn[];
}

const Switch: React.FC<ISwitchProps> = ({ columns, ...props }) => {
	const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

	return (
		<StyledList>
			{columns.map((c, i) => (
				<li key={i} className={`${selectedIndex === i ? 'selected' : ''}`}>
					<a onClick={() => setSelectedIndex(i)}>{c.label}</a>
				</li>
			))}
			<li className="slider"></li>
		</StyledList>
	);
};

export default Switch;
