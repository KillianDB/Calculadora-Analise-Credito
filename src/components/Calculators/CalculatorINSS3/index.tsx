import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import { MoneyInput } from "../../MoneyInput";

interface CalculatorINSS3Props {
	isChecked: boolean;
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}

export function CalculatorINSS3({
	isChecked,
	setAllInputsFilled,
	setFinalResult,
}: CalculatorINSS3Props) {
	const [values, setValues] = useState([{ label: "SALÁRIO: ", value: 0 }]);
	const [results, setResults] = useState([
		"VALOR EMPRÉSTIMO: R$00000,00",
		"VALOR MARGEM EMPRÉSTIMO: R$00000,00",
		"SALDO DEVEDOR (APROXIMADO): R$ 00000,00",
		"PARCELA: R$ 0000,00",
		"VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): R$ 00000,00",
		"LIBERA + O VALOR (APROXIMADO) DE: R$ 0000,00",
	]);
	const [totais, setTotal] = useState([
		"TOTAL: R$ 0,00",
		"PARCELA R$ 0,00",
		"84x",
		"TOTAL: R$ 0,00",
		"(com redução)",
		"PARCELA R$ 0,00",
		"84x",
	]);
	const label: string = "SALÁRIO: ";

	function handleInputValue(label: string, value: number) {
		setValues([{ label, value }]);
		const result = calculate(
			"INSS",
			"Cálculo Salário Cliente Sem Cartões",
			[{ label, value }]
		);
		console.log("CHECKED", isChecked);

		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 2).concat(result.slice(5, 9)));
			setTotal(result.slice(2, 5).concat(result.slice(9, 12)));

			// if (!isChecked) {
			// 	const finalResult: string[] = [
			// 		"Bem vindo, Cliente CR",
			// 		`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
			// 		`Valor Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
			// 		`${result[2].split(" R$ ")[1]}`,
			// 		`${result[3].split(" R$ ")[1]} 84x`,
			// 	];
			// 	setFinalResult(finalResult);
			// } else {
			const finalResult: string[] = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
				//total sem extra
				`${result[2].split(" R$ ")[1]}`,
				//parcela sem extra
				`${result[3].split(" R$ ")[1]} 84x`,
				//liberado
				`${result[8].split(" R$ ")[1]}`,
				//total com extra
				`${result[9].split(" R$ ")[1]}`,
				`${result[10].split(" R$ ")[1]} 84x`,
			];
			setFinalResult(finalResult);
			// }
		}
	}

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	return (
		<div
			className='calculatorComponentDiv'
			style={isChecked ? { height: "70vh" } : { height: "44vh" }}
		>
			<CalculatorTitle
				menu='INSS'
				submenu='Cálculo Salário Cliente Sem Cartões'
			/>
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

			{!isChecked ? (
				<div className='answerContainer' style={{ height: "11vh" }}>
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
			) : (
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
					<div className='resultsContainer'>
						<CalculatorResult result={results[2]} />
						<CalculatorResult result={results[3]} />
						<CalculatorResult result={results[4]} />
						<p></p>
						<CalculatorResult result={results[5]} />
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
