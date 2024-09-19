import { Key, useEffect, useState } from "react";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./prefeituras.css";
import { formatNumber } from "../../../utils/formatNumbers";

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
		{ label: "CÁLCULO DE VALOR  POR PARCELA: ", value: 0 },
	]);
	const [result, setResult] = useState(["VALOR LIBERADO:", "R$ 0,00", "84x"]);
	const [totais, setTotais] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"84x",
		// "TOTAL: R$ 0,00",
		// "PARCELA - R$ 0,00",
		// "72x",
		// "TOTAL: R$ 0,00",
		// "PARCELA - R$ 0,00",
		// "60x",
		// "TOTAL: R$ 0,00",
		// "PARCELA - R$ 0,00",
		// "48x",
		// "TOTAL: R$ 0,00",
		// "PARCELA - R$ 0,00",
		// "36x",
		// "TOTAL: R$ 0,00",
		// "PARCELA - R$ 0,00",
		// "24x",
	]);

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);

		if (banco === "VALOR") {
			setResult([
				"VALOR LIBERADO:",
				`R$ ${formatNumber(value / 0.0749)}`,
				"84x",
			]);
			setTotais([
				`TOTAL: R$ ${formatNumber(value / 0.0387)}`,
				`PARCELA - R$ ${value}`,
				"84x",
			]);
		} else if (banco === "DAYCOVAL" || banco === "SANTANDER") {
			setResult([
				"VALOR LIBERADO:",
				`R$ ${formatNumber(value / 0.0295)}`,
				"84x",
			]);
			setTotais([
				`TOTAL: R$ ${formatNumber(value / 0.0387)}`,
				`PARCELA - R$ ${value}`,
				"84x",
			]);
		} else if (banco === "ASPECIR") {
			setResult([
				"VALOR LIBERADO:",
				`R$ ${formatNumber(value / 0.032057)}`,
				"84x",
			]);
			setTotais([
				`TOTAL: R$ ${formatNumber(value / 0.0387)}`,
				`PARCELA - R$ ${value}`,
				"84x",
			]);
		}

		const finalResult: string[] = [
			//[0]
			"Bem vindo, Cliente CR",
			//[1]
			`Valor Empréstimo R$ ${formatNumber(value / 0.032057)}`,
			//[2]
			`Valor Parcela R$ ${value} 84x`,
			//[3]
			`${formatNumber(value / 0.0387)}`,
			//[4]
			`${value} 84x`,
			// //[5]
			// `${result[4].split(" - R$ ")[1]} 72x`,
			// //[6]
			// `${result[5].split(" - R$ ")[1]} 60x`,
			// //[7]
			// `${result[6].split(" - R$ ")[1]} 48x`,
			// //[8]
			// `${result[7].split(" - R$ ")[1]} 36x`,
			// //[9]
			// `${result[8].split(" - R$ ")[1]} 24x`,
		];
		setFinalResult(finalResult);
		console.log("finalResult", finalResult);
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
	const chunkedLiberado = chunkArray(result.slice(0, 3), 3);

	return (
		<div className='calculatorComponentDiv' id='calculatorComponentDivTwo'>
			<CalculatorTitle menu='Prefeituras' submenu={banco} />
			<div className='inputsContainer'>
				<CalculatorInput
					key={values[0].label}
					label={values[0].label}
					onChange={(e) =>
						handleInputValue(values[0].label, +e.target.value)
					}
				/>
			</div>

			<section className='answerContainer' id='answerContainerTwo'>
				{chunkedLiberado.map((chunk, index) => (
					<div key={index} className='totaisContainer'>
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
				<h3 className='atencaoPrefeituras'>
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
