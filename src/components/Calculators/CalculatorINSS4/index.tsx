import { useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

interface CalculatorINSS4Props {
	isChecked: boolean;
}

export function CalculatorINSS4({ isChecked }: CalculatorINSS4Props) {
	const [results, setResults] = useState([""]);
	const [totais, setTotais] = useState([""]);
	const label: string = "SALÁRIO: ";

	function handleInputValue(label: string, value: string) {
		// if (!filterIsChecked) {

		// const values = [{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: "" }, {label:"VALOR MARGEM CARTÃO INSS: ", value:""}, {label:"VALOR MARGEM CARTÃO BENEFÍCIO: ", value:""},{label:"VALOR EMPRÉSTIMO: ", value:""},{label:"CARTÃO INSS: ", value:""},{label:"CARTÃO BENEFÍCIO: ", value:""},{label:"VALOR CARTÃO ENVIADO: ",value:""}];

		// if (label == "SALÁRIO: ") {
		// 	const result = calculate(
		// 		"INSS",
		// 		"Cálculo Salário Cliente",
		// 		 [{label, value}]
		// 	);
		// 	if (result != "no valid labels" && result != undefined) {
		// 		setResults(result.slice(0, 1));
		// 		setTotais(result.slice(1, 2));
		// 	}
		// }
		// }

		// const values = [
		// 	{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: "" },
		// 	{ label: "VALOR MARGEM CARTÃO INSS: ", value: "" },
		// 	{ label: "VALOR MARGEM CARTÃO BENEFÍCIO: ", value: "" },
		// 	{ label: "VALOR EMPRÉSTIMO: ", value: "" },
		// 	{ label: "CARTÃO INSS: ", value: "" },
		// 	{ label: "CARTÃO BENEFÍCIO: ", value: "" },
		// 	{ label: "VALOR CARTÃO ENVIADO: ", value: "" },
		// 	{ label: "SALDO DEVEDOR(APROXIMADO): ", value: "" },
		// 	{ label: "PARCELA: ", value: "" },
		// 	{
		// 		label: "VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): ",
		// 		value: "",
		// 	},
		// 	{ label: "LIBERA + O VALOR (APROXIMADO) DE: ", value: "" },
		// ];

		if (label == "SALÁRIO: ") {
			const result = calculate("INSS", "Cálculo Salário Cliente", [
				{ label, value },
			]);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 6).concat(result.slice(7, 10)));
				setTotais([result[7], result[10]]);
			}
		}
	}

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle menu='INSS' submenu='Cálculo Salário Cliente' />
			<CalculatorInput
				label={label}
				onChange={(e) => handleInputValue(label, e.target.value)}
			/>
			<CalculatorResult result={results[0]} />
			<CalculatorResult result={results[1]} />
			<CalculatorResult result={results[2]} />
			<CalculatorResult result={results[3]} />
			<CalculatorResult result={results[4]} />
			<CalculatorResult result={results[5]} />
			<CalculatorResult result={results[6]} />
			<CalculatorTotal total={totais[0]} />
			<CalculatorResult result={results[7]} />
			<CalculatorResult result={results[8]} />
			<CalculatorResult result={results[9]} />
			<CalculatorResult result={results[10]} />
			<CalculatorTotal total={totais[1]} />
		</div>
	);
}
