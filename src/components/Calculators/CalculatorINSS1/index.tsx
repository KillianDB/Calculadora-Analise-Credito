import { useState, useEffect } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

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
		"VALOR CARTÃO INSS: R$ 00000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO ENVIADO: R$ 00000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO BENEFÍCIO: R$ 00000,00",
		"PARCELA - R$ 0000,00",
		"VALOR CARTÃO ENVIADO: R$ 00000,00",
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
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: "" },
		{ label: "VALOR MARGEM CARTÃO INSS: ", value: "" },
		{ label: "VALOR MARGEM CARTÃO BENEFÍCIO: ", value: "" },
	]);

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== "");
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	function handleInputValue(label: string, value: string) {
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
				`Valor Empréstimo R$ ${result[0].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split("$ ")[1]} 84x`,
				`Valor Cartão INSS R$ ${result[2].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[3].split("$ ")[1]} 84x`,
				`Valor Cartão Enviado R$ ${result[8].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[9].split("$ ")[1]} 84x`,
				`R$ ${result[10].split("$ ")[1]}`,
				`R$ ${result[11].split("$ ")[1]} 84x`,
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
							handleInputValue(label, e.target.value)
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
