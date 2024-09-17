import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "../CalculatorINSS4/calculatorINSS4.css";

interface CalculatorLOASProps {
	isChecked: boolean;
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}

export function CalculatorLOAS({
	isChecked,
	setAllInputsFilled,
	setFinalResult,
}: CalculatorLOASProps) {
	const [values, setValues] = useState([{ label: "SALÁRIO: ", value: 0 }]);
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00.000,00",
		"VALOR MARGEM EMPRÉSTIMO: R$00.000,00",
		"CARTÃO INSS: R$00.000,00",
		"VALOR MARGEM CARTÃO INSS: R$00.000,00",
		"VALOR CARTÃO ENVIADO: R$00.000,00",
		"VALOR MARGEM CARTÃO ENVIADO: R$00.000,00",

		"LIBERA + O VALOR (APROXIMADO) DE: R$00.000,000",
		"APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
	]);
	const [totais, setTotais] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA - R$ 0,00",
		"84x",
		"TOTAL: R$ 0,00",
		"(com redução)",
		"PARCELA - R$ 0,00",
		"84x",
	]);
	const label: string = "SALÁRIO: ";

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);
		const result = calculate("LOAS REP LEGAL", "Cálculo Salário LOAS/BPC", [
			{ label, value },
		]);
		console.log("CHECKED", isChecked);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 6).concat(result.slice(9, 10)));
			setTotais(result.slice(6, 9).concat(result.slice(10, 13)));
			console.log("results", results);
			console.log("totais", totais);
			console.log("results[5]", results[5]);

			const finalResult: string[] = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
				`Valor Cartão INSS R$ ${result[2].split(" R$ ")[1]}`,
				`Parcela Cartão INSS R$ ${result[3].split(" R$ ")[1]} 84x`,
				`Valor Cartão Enviado R$ ${result[4].split(" R$ ")[1]}`,
				`Parcela Cartão Enviado R$ ${result[5].split(" R$ ")[1]} 84x`,
				//total sem extra
				`${totais[0].split(" R$ ")[1]}`,
				//parcela sem extra
				`${totais[1].split(" R$ ")[1]} 84x`,
				//liberado
				`R$ ${results[6].split(" R$ ")[1]}`,
				//total com extra
				`${totais[3].split(" R$ ")[1]}`,
				//parcela com extra
				`${totais[4].split(" R$ ")[1]} 84x`,
			];
			setFinalResult(finalResult);
		}
	}

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	return (
		<div
			className='calculatorComponentDiv'
			id='calculatorComponentDivINSS4'
		>
			<CalculatorTitle
				menu='LOAS REP LEGAL'
				submenu='Cálculo Salário LOAS/BPC'
			/>
			<div className='inputsContainer' id='inputsContainerINSS4'>
				<CalculatorInput
					label={label}
					onChange={(e) => handleInputValue(label, +e.target.value)}
				/>
			</div>
			{!isChecked ? (
				<div className='answerContainer'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
						<CalculatorResult result={results[1]} />
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
						<CalculatorResult result={results[5]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
				</div>
			) : (
				<div className='answerContainer' id='answerContainerLOAS'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
						<CalculatorResult result={results[1]} />
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
						<CalculatorResult result={results[5]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
					<div className='resultsContainer'>
						<CalculatorResult result={results[6]} />
						<p>
							APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM
							ALTERAR A PARCELA.
						</p>
					</div>
					<div className='totaisContainer'>
						{totais.slice(3, 6).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
