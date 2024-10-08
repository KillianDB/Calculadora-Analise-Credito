import React, { useState, ChangeEvent } from "react";
import InputMask from "react-input-mask";

interface inputProps {
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputMoedaBrasileira: React.FC<inputProps> = (props) => {
	const [valor, setValor] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
		const formattedValue = formatCurrency(value);
		setValor(formattedValue);
	};

	const formatCurrency = (value: string) => {
		const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		const formattedNumber = new Intl.NumberFormat("pt-BR", options).format(
			Number(value) / 100
		);
		return formattedNumber;
	};

	return (
		<div>
			<label>{props.label} </label>
			<InputMask
				mask=''
				value={valor}
				onChange={handleChange}
				placeholder='0,00'
			>
				<>
					{(
						inputProps: React.InputHTMLAttributes<HTMLInputElement>
					) => <input {...inputProps} type='text' />}
				</>
			</InputMask>
		</div>
	);
};

export default InputMoedaBrasileira;
