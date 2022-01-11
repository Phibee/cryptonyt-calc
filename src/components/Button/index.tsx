import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
	background: #fff;
	color: inherit;
	border: none;
	padding: 10px 25px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	display: inline-block;
	border-radius: 50px;
	transition: all 0.2s;
	user-select: none;

	&:hover {
		box-shadow: 0 0px 13px -3px #dedede;
	}

	&:active {
		transform: translateY(3px) scale(0.99);
	}
`;

export interface IButtonProps {
	label: string;
}

const Button: React.FC<IButtonProps> = ({ label, ...props }) => {
	return <StyledButton>{label}</StyledButton>;
};

export default Button;
