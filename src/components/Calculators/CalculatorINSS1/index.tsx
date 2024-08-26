import { useState, useEffect } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import { formatNumber } from "../../../utils/formatNumbers";

export function CalculatorINSS1({
	setAllInputsFilled,
	setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO INSS: R$ 000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO ENVIADO: R$ 000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO BENEFÍCIO: R$ 000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO ENVIADO: R$ 000,00",
		"PARCELA - R$ 0000,00",
	]);
	const [totais, setTotal] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"84x",
	]);
	const labels: string[] = [
		"VALOR MARGEM EMPRÉSTIMO: ",
		"VALOR MARGEM CARTÃO INSS: ",
		"VALOR MARGEM CARTÃO BENEFÍCIO: ",
	];
	const [values, setValues] = useState([
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
		{ label: "VALOR MARGEM CARTÃO INSS: ", value: 0 },
		{ label: "VALOR MARGEM CARTÃO BENEFÍCIO: ", value: 0 },
	]);

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	function handleInputValue(label: string, value: number) {
		const updatedValues = values.map((item) =>
			item.label === label ? { ...item, value } : item
		);
		setValues(updatedValues);

		const result = calculate(
			"INSS",
			"Cálculo por Margem Disponível",
			updatedValues
		);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 10));
			setTotal(result.slice(10, 13));
			const finalResult = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
				`Parcela Empréstimo R$ ${result[1].split(" R$ ")[1]} 84x`,
				`Valor Cartão R$ ${result[13]}`,
				`Parcela Cartão R$ ${formatNumber(
					parseFloat(result[3].split(" R$ ")[1]) +
						parseFloat(result[7].split(" R$ ")[1])
				)} 84x`,
				`Valor Cartão Enviado R$ ${formatNumber(
					parseFloat(result[4].split(" R$ ")[1]) +
						parseFloat(result[8].split(" R$ ")[1])
				)}`,
				`Parcela Cartão Enviado R$ ${formatNumber(
					parseFloat(result[5].split(" R$ ")[1]) +
						parseFloat(result[9].split(" R$ ")[1])
				)} 84x`,
				`R$ ${result[10].split(" R$ ")[1]}`,
				`R$ ${result[11].split(" R$ ")[1]} 84x`,
			];
			setFinalResult(finalResult);
		}
	}

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle
				menu='INSS'
				submenu='Cálculo por Margem Disponível'
			/>
			<div className='inputsContainer'>
				{labels.map((label: string) => (
					<CalculatorInput
						key={label}
						label={label}
						onChange={(e) =>
							handleInputValue(label, +e.target.value)
						}
					/>
				))}
			</div>
			<section className='answerContainer'>
				<div className='resultsContainer'>
					{results.map((result: string, index) => (
						<CalculatorResult key={index} result={result} />
					))}
				</div>
				<div className='totaisContainer'>
					{totais.map((total) => (
						<CalculatorTotal total={total} />
					))}
				</div>
			</section>
		</div>
	);
}
