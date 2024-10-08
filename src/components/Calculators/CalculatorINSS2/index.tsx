import { Key, useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS2.css";
import { MoneyInput } from "../../MoneyInput";

export function CalculatorINSS2({
	setAllInputsFilled,
	setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [values, setValues] = useState([
		{ label: "VALOR DE EMPRÉSTIMO SOLICITADO: ", value: 0 },
	]);
	const [totais, setTotais] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"84x",
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"72x",
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"60x",
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"48x",
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"36x",
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"24x",
	]);
	const label = "VALOR DE EMPRÉSTIMO SOLICITADO: ";

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);
		const result = calculate("INSS", "Cálculo Valor Solicitado", [
			{ label, value },
		]);
		if (result !== "no valid labels" && result !== undefined) {
			setTotais(result);
			const finalResult: string[] = [
				//[0]
				"Bem vindo, Cliente CR",
				//[1]
				`Valor Empréstimo Solicitado R$ ${result[0].split(" R$ ")[1]}`,
				//[2]
				`${result[0].split(" R$ ")[1]}`,
				//[3]
				`${result[1].split(" - R$ ")[1]} 84x`,
				//[4]
				`${result[4].split(" - R$ ")[1]} 72x`,
				//[5]
				`${result[7].split(" - R$ ")[1]} 60x`,
				//[6]
				`${result[10].split(" - R$ ")[1]} 48x`,
				//[7]
				`${result[13].split(" - R$ ")[1]} 36x`,
				//[8]
				`${result[16].split(" - R$ ")[1]} 24x`,
			];
			setFinalResult(finalResult);
		}
	}

	function chunkArray(array: string[], chunkSize: number) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			result.push(array.slice(i, i + chunkSize));
		}
		return result;
	}

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	const chunkedTotais = chunkArray(totais, 3);

	return (
		<div className='calculatorComponentDiv' id='calculatorComponentDivTwo'>
			<CalculatorTitle menu='INSS' submenu='Cálculo Valor Solicitado' />
			<div className='inputsContainer'>
				<MoneyInput
					key={label}
					label={label}
					value={
						typeof values[0].value === "string"
							? parseFloat(values[0].value)
							: values[0].value
					}
					addOnBefore='R$'
					onChange={(e) => handleInputValue(label, +e.target.value)}
				/>
			</div>
			<section className='answerContainer' id='answerContainerTwo'>
				{chunkedTotais.map((chunk, index) => (
					<div
						key={index}
						className='totaisContainer'
						id='totaisContainerINSS2'
					>
						{chunk.map(
							(
								total: string,
								subIndex: Key | null | undefined
							) => (
								<CalculatorTotal key={subIndex} total={total} />
							)
						)}
					</div>
				))}
			</section>
		</div>
	);
}
