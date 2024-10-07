import { useEffect, useState } from "react";
import CalculatorInput, { CalculatorInputProps } from "../CalculatorInput";

interface MoneyInputProps extends CalculatorInputProps {
	value: number;
	addOnBefore?: string;
}

export function MoneyInput({
	value,
	addOnBefore = "R$",
	label,
	onChange,
	...props
}: MoneyInputProps) {
	const [currentValue, setCurrentValue] = useState<string>(`${value}`);
	useEffect(() => {
		const valueString = `${value}`;
		if (!/\D/.test(valueString.replace(".", ""))) {
			setCurrentValue(value.toFixed(2).toString().replace(".", ","));
		}
	}, [value]);

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		const valueRemoved = e.target.value.replace(",", "");
		const newValue =
			valueRemoved.slice(0, valueRemoved.length - 2) +
			"." +
			valueRemoved.slice(valueRemoved.length - 2);
		onChange({
			...e,
			target: {
				...e.target,
				value: newValue,
			},
		});
	}
	return (
		<CalculatorInput
			value={currentValue}
			addonBefore={addOnBefore}
			label={label}
			onChange={handleOnChange}
			{...props}
		/>
	);
}
