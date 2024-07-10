import { Key, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

export function CalculatorINSS2({ setAllInputsFilled }) {
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
	const label = "VALOR DE EMPRÉSTIMO SOLICITADO: ";

	function handleInputValue(label: string, value: string) {
		const result = calculate("INSS", "Cálculo Valor Solicitado", [
			{ label, value },
		]);
		if (result !== "no valid labels" && result !== undefined) {
			setTotais(result);
		}
	}

	function chunkArray(array: string[], chunkSize: number) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			result.push(array.slice(i, i + chunkSize));
		}
		return result;
	}

	const chunkedTotais = chunkArray(totais, 3);

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle menu='INSS' submenu='Cálculo Valor Solicitado' />
			<div className='inputsContainer'>
				<CalculatorInput
					key={label}
					label={label}
					onChange={(e) => handleInputValue(label, e.target.value)}
				/>
			</div>
			<section className='answerContainer'>
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
