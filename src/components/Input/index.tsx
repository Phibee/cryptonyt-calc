import React from 'react';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const InputStyled = styled.input`
	border: 1px solid #fff;
	outline: none;
	background: transparent;
	border-radius: 30px;
	min-height: 40px;
	font-size: 20px;
	padding: 0px 15px;
	color: white;
`;

const LabelStyled = styled.label`
	color: #fff;
	font-family: 'Roboto';
	padding-bottom: 5px;
	padding-left: 8px;
	font-size: 14px;
`;

export interface IInputProps extends HTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input: React.FC<IInputProps> = ({ label, ...props }) => {
	return (
		<InputWrapper>
			<LabelStyled>{label}</LabelStyled>
			<InputStyled {...props} type="text" />
		</InputWrapper>
	);
};

export default Input;
