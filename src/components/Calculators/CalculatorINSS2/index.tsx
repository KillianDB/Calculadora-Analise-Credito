import {
	//  Dispatch,
	Key,
	// SetStateAction, useEffect,
	useState,
} from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS2.css";

// interface CalculatorINSS2Props {
// 	setAllInputsFilled: Dispatch<SetStateAction<boolean>>;
// 	setFinalResult: Dispatch<SetStateAction<string[]>>;
// }

// export const CalculatorINSS2: React.FC<CalculatorINSS2Props> = ({
// 	setAllInputsFilled,
// 	setFinalResult,
// }) =>
export function CalculatorINSS2() {
	// const [values, setValues] = useState([
	// 	{ label: "VALOR DE EMPRÉSTIMO SOLICITADO: ", value: "" },
	// ]);
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
		// setValues([{ label, value }]);
		const result = calculate("INSS", "Cálculo Valor Solicitado", [
			{ label, value },
		]);
		if (result !== "no valid labels" && result !== undefined) {
			setTotais(result);
		}
		// const finalResult: string[] = [];
		// setFinalResult(finalResult);
	}

	function chunkArray(array: string[], chunkSize: number) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			result.push(array.slice(i, i + chunkSize));
		}
		return result;
	}

	// useEffect(() => {
	// 	const allFilled = values.every((item) => item.value !== "");
	// 	setAllInputsFilled(allFilled);
	// }, [values, setAllInputsFilled]);

	const chunkedTotais = chunkArray(totais, 3);

	return (
		<div className='calculatorComponentDiv' id='calculatorComponentDivTwo'>
			<CalculatorTitle menu='INSS' submenu='Cálculo Valor Solicitado' />
			<div className='inputsContainer'>
				<CalculatorInput
					key={label}
					label={label}
					onChange={(e) => handleInputValue(label, e.target.value)}
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
