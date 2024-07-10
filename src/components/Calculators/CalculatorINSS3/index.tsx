import { useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

export function CalculatorINSS3() {
	const [results, setResults] = useState([""]);
	const [totais, setTotal] = useState([""]);
	// const [filterIsChecked, setFilterIsChecked] = useState(false);
	const label: string = "SALÁRIO";

	function handleInputValue(label: string, value: string) {
		// if (!filterIsChecked) {

		// const values = [{ label: "VALOR EMPRÉSTIMO: ", value: "" }];

		// if (label == "SALÁRIO: ") {
		// 	values[0].value = value;
		// 	const result = calculate(
		// 		"INSS",
		// 		"Cálculo Salário Cliente Sem Cartões",
		// 		values
		// 	);
		// 	if (result != "no valid labels" && result != undefined) {
		// 		setResults(result.slice(0, 1));
		// 		setTotal(result.slice(1, 2));
		// 	}
		// }
		// }

		// const values = [
		// 	{ label: "VALOR EMPRÉSTIMO: ", value: "" },
		// 	{ label: "SALDO DEVEDOR(APROXIMADO): ", value: "" },
		// 	{ label: "PARCELA: ", value: "" },
		// 	{
		// 		label: "VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): ",
		// 		value: "",
		// 	},
		// 	{ label: "LIBERA + O VALOR (APROXIMADO) DE: ", value: "" },
		// ];

		if (label == "SALÁRIO: ") {
			const result = calculate(
				"INSS",
				"Cálculo Salário Cliente Sem Cartões",
				[{ label, value }]
			);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 1).concat(result.slice(2, 5)));
				setTotal([result[2], result[6]]);
			}
		}
	}

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle
				menu='INSS'
				submenu='Cálculo Salário Cliente Sem Cartões'
			/>
			<CalculatorInput
				label={label}
				onChange={(e) => handleInputValue(label, e.target.value)}
			/>
			<CalculatorResult result={results[0]} />
			<CalculatorTotal total={totais[0]} />
			<CalculatorResult result={results[1]} />
			<CalculatorResult result={results[2]} />
			<CalculatorResult result={results[3]} />
			<CalculatorResult result={results[4]} />
			<CalculatorTotal total={totais[1]} />
		</div>
	);
}
