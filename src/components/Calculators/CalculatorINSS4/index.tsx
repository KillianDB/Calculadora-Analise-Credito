import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS4.css";

interface CalculatorINSS4Props {
	isChecked: boolean;
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}

export function CalculatorINSS4({
	isChecked,
	setAllInputsFilled,
	setFinalResult,
}: CalculatorINSS4Props) {
	const [values, setValues] = useState([{ label: "SALÁRIO: ", value: 0 }]);
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00.000,00",
		"VALOR MARGEM EMPRÉSTIMO: R$00.000,00",
		"CARTÃO INSS: R$00.000,00",
		"VALOR MARGEM CARTÃO INSS: R$00.000,00",
		"CARTÃO BENEFÍCIO: R$00.000,00",
		"VALOR MARGEM CARTÃO BENEFÍCIO: R$00.000,00",
		"VALOR CARTÃO ENVIADO: R$00.000,00",
		"VALOR MARGEM CARTÃO ENVIADO: R$00.000,00",

		"SALDO DEVEDOR (APROXIMADO): R$00.000,00",
		"PARCELA: R$00.000,00",
		"VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): R$00.000,00",
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
		const result = calculate("INSS", "Cálculo Salário Cliente", [
			{ label, value },
		]);
		console.log("CHECKED", isChecked);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 8).concat(result.slice(11, 16)));
			setTotais(result.slice(8, 11).concat(result.slice(16, 19)));

			const finalResult: string[] = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
				`Valor Cartão R$ ${result[19]}`,
				`Parcela Cartão R$ ${result[20]} 84x`,
				`Valor Cartão Enviado R$ ${result[6].split(" R$ ")[1]}`,
				`Parcela Cartão Enviado R$ ${result[7].split(" R$ ")[1]} 84x`,
				//total sem extra
				`${result[8].split(" R$ ")[1]}`,
				//parcela sem extra
				`${result[9].split(" R$ ")[1]} 84x`,
				//liberado
				`R$ ${result[14].split(" R$ ")[1]}`,
				//total com extra
				`${result[16].split(" R$ ")[1]}`,
				//parcela com extra
				`${result[17].split(" R$ ")[1]} 84x`,
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
			<CalculatorTitle menu='INSS' submenu='Cálculo Salário Cliente' />
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
						<CalculatorResult result={results[6]} />
						<CalculatorResult result={results[7]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
				</div>
			) : (
				<div className='answerContainer' id='answerContainerINSS4'>
					<div className='resultsContainer'>
						<CalculatorResult result={results[0]} />
						<CalculatorResult result={results[1]} />
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
						<CalculatorResult result={results[5]} />
						<CalculatorResult result={results[6]} />
						<CalculatorResult result={results[7]} />
					</div>
					<div className='totaisContainer'>
						{totais.slice(0, 3).map((total) => (
							<CalculatorTotal total={total} />
						))}
					</div>
					<div className='resultsContainer'>
						<CalculatorResult result={results[8]} />
						<CalculatorResult result={results[9]} />
						<CalculatorResult result={results[10]} />
						<CalculatorResult result={results[11]} />
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
