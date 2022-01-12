import React, { useRef, useState } from 'react';
import Input, { IInputProps } from '../Input';
import Inputmask from 'inputmask';

export interface ICurrencyInputProps extends IInputProps {
	digits?: number;
	value?: number;
	withComma?: boolean;
	groupSeparator?: '';
	onValueChanged?: (e: number) => void;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = ({
	digits = 2,
	value = 0,
	withComma = true,
	groupSeparator,
	onValueChanged,
	...props
}) => {
	const getParseVal = React.useCallback(
		(value: string | number) =>
			parseFloat(value.toString().replace(/[, ]+/g, '')),
		[]
	);

	const inputRef = useRef<any>(null);
	const [inputVal, setInputVal] = useState<number | string | undefined>(value);
	const [startSel, setStartSel] = useState<number | null>(null);

	const handleInputChange = React.useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const { value, selectionStart } = e.currentTarget;
			setInputVal(value || 0);
			setStartSel(selectionStart);
			props.onInput && props.onInput(e);
			onValueChanged && onValueChanged(getParseVal(value || 0));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleOnChange = React.useCallback(
		(e: any) => {
			const { setSelectionRange } = e.nativeEvent;
			startSel && setSelectionRange(startSel, startSel);

			props.onChange && props.onChange(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setStartSel]
	);

	const handleOnMouseDown = React.useCallback(
		(e: any) => {
			setStartSel(e.currentTarget.selectionStart);
			props.onMouseDown && props.onMouseDown(e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	React.useEffect(() => {
		if (!startSel) setInputVal(value || 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, startSel]);

	React.useEffect(() => {
		if (!inputRef.current) return;

		var im = new Inputmask('currency', {
			alias: 'decimal',
			prefix: '',
			groupSeparator: !withComma ? '' : groupSeparator,
			digits: digits?.toString(),
		});

		im.mask(inputRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputRef, withComma]);

	return (
		<Input
			{...props}
			ref={inputRef}
			value={inputVal}
			onInput={handleInputChange}
			onChange={handleOnChange}
			onMouseDown={handleOnMouseDown}
		/>
	);
};

export default CurrencyInput;
