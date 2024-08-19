import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

interface CalculatorINSS3Props {
	isChecked: boolean;
	// setAllInputsFilled: (filled: boolean) => void;
	// setFinalResult: (result: string[]) => void;
}

export function CalculatorINSS3({
	isChecked,
}: // setAllInputsFilled,
// setFinalResult,
CalculatorINSS3Props) {
	const [values, setValues] = useState([{ label: "SALÁRIO: ", value: "" }]);
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00000,00",
		"VALOR MARGEM EMPRÉSTIMO: R$00000,00",
		"SALDO DEVEDOR (APROXIMADO): R$ 00000,00",
		"PARCELA: R$ 0000,00",
		"VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): R$ 00000,00",
		"LIBERA + O VALOR (APROXIMADO) DE: R$ 0000,00",
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
		setValues([{ label, value }]);
		const result = calculate(
			"INSS",
			"Cálculo Salário Cliente Sem Cartões",
			[{ label, value }]
		);
		console.log("CHECKED", isChecked);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 2).concat(result.slice(5, 9)));
			setTotal(result.slice(2, 5).concat(result.slice(9, 12)));
			console.log("RESULT ", result);
			console.log("RESULTS ", results);
			console.log("TOTAL ", totais);
		}
		// const finalResult: string[] = [];
		// setFinalResult(finalResult);
	}

	// useEffect(() => {
	// 	const allFilled = values.every((item) => item.value !== "");
	// 	setAllInputsFilled(allFilled);
	// }, [values, setAllInputsFilled]);

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

			{!isChecked ? (
				<div className='answerContainer'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
						<CalculatorResult result={results[1]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
				</div>
			) : (
				<div className='answerContainer'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
						<CalculatorResult result={results[1]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
					<div className='resultsContainer'>
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
						<CalculatorResult result={results[5]} />
						<p>
							APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM
							ALTERAR A PARCELA.
						</p>
					</div>
					<div className='totaisContainer'>
						{totais.slice(3, 7).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
