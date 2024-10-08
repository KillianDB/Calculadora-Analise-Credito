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
		let newValue = "";
		// if (valueRemoved.length > 5) {
		// 	console.log("valueRemoved.length mais que 5", valueRemoved);
		// 	newValue =
		// 		valueRemoved.slice(0, valueRemoved.length - 5) +
		// 		"." +
		// 		valueRemoved.slice(1, valueRemoved.length - 2) +
		// 		"," +
		// 		valueRemoved.slice(valueRemoved.length - 2);
		// 	console.log("newValue", newValue);
		// } else {
		newValue =
			valueRemoved.slice(0, valueRemoved.length - 2) +
			"." +
			valueRemoved.slice(valueRemoved.length - 2);
		// }
		console.log("newValue no onchange", newValue);
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
