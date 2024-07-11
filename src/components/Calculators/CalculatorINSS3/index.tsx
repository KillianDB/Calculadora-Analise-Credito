import { useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

interface CalculatorINSS3Props {
	isChecked: boolean;
}

export function CalculatorINSS3({ isChecked }: CalculatorINSS3Props) {
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00000,00",
		"SALDO DEVEDOR (APROXIMADO): R$ 00000,00",
		"PARCELA: R$ 0000,00",
		"VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): R$ 00000,00",
		"LIBERA + O VALOR (APROXIMADO) DE: R$ 0000,00",
		"APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
	]);
	const [totais, setTotal] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"84x",
		"TOTAL: R$ 0,00",
		"(com redução)",
		"PARCELA - R$ 0,00",
		"84x",
	]);
	const label: string = "SALÁRIO: ";

	function handleInputValue(label: string, value: string) {
		const result = calculate(
			"INSS",
			"Cálculo Salário Cliente Sem Cartões",
			[{ label, value }]
		);
		console.log("CHECKED", isChecked);

		if (!isChecked) {
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 2));
				setTotal(result.slice(2, 5));
			}
		} else {
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 2).concat(result.slice(5, 14)));
				setTotal(result.slice(2, 5).concat(result.slice(14, 18)));
			}
		}
	}

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle
				menu='INSS'
				submenu='Cálculo Salário Cliente Sem Cartões'
			/>
			<div className='inputsContainer'>
				<CalculatorInput
					label={label}
					onChange={(e) => handleInputValue(label, e.target.value)}
				/>
			</div>

			{isChecked ? (
				<div className='answerContainer'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
					</div>
					<div className='totaisContainer'>
						<CalculatorTotal total={totais[0]} />
					</div>
					<div className='resultsContainer'>
						<CalculatorResult result={results[1]} />
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
					</div>
					<div className='totaisContainer'>
						<CalculatorTotal total={totais[1]} />
					</div>
				</div>
			) : (
				<div className='answerContainer'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
					</div>
					<div className='totaisContainer'>
						<CalculatorTotal total={totais[0]} />
					</div>
				</div>
			)}
		</div>
	);
}
