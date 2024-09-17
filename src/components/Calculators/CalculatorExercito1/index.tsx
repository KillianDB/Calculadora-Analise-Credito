import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

interface CalculatorExercito1Props {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}

export function CalculatorExercito1({
	setAllInputsFilled,
	setFinalResult,
}: CalculatorExercito1Props) {
	const [values, setValues] = useState([
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
	]);
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00000,00",
		"PARCELA: R$00000,00",
	]);
	const [totais, setTotal] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA: R$ 0,00",
		"84x",
	]);
	const label: string = "VALOR MARGEM EMPRÉSTIMO: ";

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);
		const result = calculate("Exército", "Cálculo por Margem Disponível", [
			{ label, value },
		]);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 2));
			setTotal(result.slice(2, 5));

			const finalResult: string[] = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split(" R$ ")[1]} 72x`,
				//total
				`${result[2].split(" R$ ")[1]}`,
				//parcela
				`${result[3].split(" R$ ")[1]} 72x`,
			];
			console.log("finalResult", finalResult);
			setFinalResult(finalResult);
		}
	}

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle
				menu='Exército'
				submenu='Cálculo por Margem Disponível'
			/>
			<div className='inputsContainer'>
				<CalculatorInput
					label={label}
					onChange={(e) => handleInputValue(label, +e.target.value)}
				/>
			</div>
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
		</div>
	);
}
