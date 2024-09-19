import { Key, useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

export function CalculatorPrefeitura({
	setAllInputsFilled,
	setFinalResult,
	banco,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
	banco: string;
}) {
	const [values, setValues] = useState([
		{ label: "VALOR DE EMPRÉSTIMO SOLICITADO: ", value: 0 },
	]);
	const [result, setResult] = useState(["VALOR LIBERADO:", "R$ 0,00", "84x"]);
	const [totais, setTotais] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"84x",
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"72x",
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"60x",
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"48x",
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"36x",
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"24x",
	]);
	const label = "VALOR MARGEM DE EMPRÉSTIMO SOLICITADO: ";

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);
		const result = calculate("PREFEITURAS", banco, [{ label, value }]);
		if (result !== "no valid labels" && result !== undefined) {
			setResult(result.slice(0, 3));
			setTotais(result.slice(3));
			const finalResult: string[] = [
				//[0]
				"Bem vindo, Cliente CR",
				//[1]
				`Valor Empréstimo R$ ${values[0].value}`,
				//[2]
				`Valor Parcela R$ ${result[1].split(" - R$ ")[1]}`,
				//[3]
				`${result[2]}`,
				//[4]
				`${result[3].split(" - R$ ")[1]} 84x`,
				//[5]
				`${result[4].split(" - R$ ")[1]} 72x`,
				//[6]
				`${result[5].split(" - R$ ")[1]} 60x`,
				//[7]
				`${result[6].split(" - R$ ")[1]} 48x`,
				//[8]
				`${result[7].split(" - R$ ")[1]} 36x`,
				//[9]
				`${result[8].split(" - R$ ")[1]} 24x`,
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
			<CalculatorTitle menu='Prefeituras' submenu={banco} />
			<div className='inputsContainer'>
				<CalculatorInput
					key={label}
					label={label}
					onChange={(e) => handleInputValue(label, +e.target.value)}
				/>
			</div>

			<section className='answerContainer' id='answerContainerTwo'>
				<div className='totaisContainer'>
					{result[0]} {result[1]} {result[2]}
				</div>
				<h3>
					ATENÇÃO: Enviar simulação no prazo abaixo de 84x somente
					quando o cliente solicitar - Comissão diminui os prazos
					menores.
				</h3>
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
