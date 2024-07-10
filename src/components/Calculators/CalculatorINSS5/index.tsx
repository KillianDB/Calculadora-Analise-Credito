import { useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";

export function CalculatorINSS5() {
	const [results, setResults] = useState([""]);
	const [resultsPossibilidade, setResultsPossibilidade] = useState([""]);
	const [resultTotalPossibilidade, setResultTotalPossibilidade] =
		useState("");
	const [resultTrocoLiquido, setResultsTrocoLiquido] = useState("");
	const [total, setTotal] = useState("");
	const labels: string[] = [
		"VALOR MARGEM EMPRÉSTIMO: ",
		"VALOR MARGEM CARTÃO INSS: ",
		"VALOR MARGEM CARTÃO BENEFÍCIO: ",
	];
	const labelsParcela: string[] = [
		"PARCELA-1",
		"PARCELA-2",
		"PARCELA-3",
		"PARCELA-4",
		"PARCELA-5",
		"PARCELA-6",
		"PARCELA-7",
	];
	const labelsSaldo: string[] = [
		"SALDO DEVEDOR-1",
		"SALDO DEVEDOR-2",
		"SALDO DEVEDOR-3",
		"SALDO DEVEDOR-4",
		"SALDO DEVEDOR-5",
		"SALDO DEVEDOR-6",
		"SALDO DEVEDOR-7",
	];

	function handleInputValue(label: string, value: string) {
		const values = [
			{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: "" },
			{ label: "VALOR MARGEM CARTÃO INSS: ", value: "" },
			{
				label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
				value: "",
			},
			{
				label: "PARCELA-1",
				value: "",
			},
			{
				label: "PARCELA-2",
				value: "",
			},
			{
				label: "PARCELA-3",
				value: "",
			},
			{
				label: "PARCELA-4",
				value: "",
			},
			{
				label: "PARCELA-5",
				value: "",
			},
			{
				label: "PARCELA-6",
				value: "",
			},
			{
				label: "PARCELA-7",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-1",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-2",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-3",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-4",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-5",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-6",
				value: "",
			},
			{
				label: "SALDO DEVEDOR-7",
				value: "",
			},
		];
		if (label == "VALOR MARGEM EMPRÉSTIMO: ") {
			values[0].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "VALOR MARGEM CARTÃO INSS: ") {
			values[1].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "VALOR MARGEM CARTÃO BENEFÍCIO: ") {
			values[2].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-1") {
			values[3].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-2") {
			values[4].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-3") {
			values[5].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-4") {
			values[6].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-5") {
			values[7].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-6") {
			values[8].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "PARCELA-7") {
			values[9].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-1") {
			values[10].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-2") {
			values[11].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-3") {
			values[12].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-4") {
			values[13].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-5") {
			values[14].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-6") {
			values[15].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		} else if (label == "SALDO DEVEDOR-7") {
			values[16].value = value;
			const result = calculate("INSS", "Possibilidades Gerais", values);
			if (result != "no valid labels" && result != undefined) {
				setResults(result.slice(0, 4));
				setResultsPossibilidade(result.slice(5, 11));
				setResultTotalPossibilidade(result[12]);
				setResultsTrocoLiquido(result[13]);
				setTotal(result[14]);
			}
		}
	}

	return (
		<div className='calculatorComponentDiv'>
			<CalculatorTitle menu='INSS' submenu='Possibilidades Gerais' />
			{labels.map((label: string) => (
				<CalculatorInput
					label={label}
					onChange={(e) => handleInputValue(label, e.target.value)}
				/>
			))}
			{results.map((result: string) => (
				<CalculatorResult result={result} />
			))}
			<h3>NÃO PORTAMOS OS BANCO FACTA 935 - BANCO SEGURO 081 E BRB</h3>
			<h4>Calculadora de Portabilidade</h4>
			{labelsParcela.map((label: string) => (
				<CalculatorInput
					label={label.split("-")[0]}
					onChange={(e) => handleInputValue(label, e.target.value)}
				/>
			))}
			{labelsSaldo.map((label: string) => (
				<CalculatorInput
					label={label.split("-")[0]}
					onChange={(e) => handleInputValue(label, e.target.value)}
				/>
			))}
			{resultsPossibilidade.map((result: string) => (
				<CalculatorResult result={result} />
			))}
			<CalculatorResult result={resultTotalPossibilidade} />
			<h3>
				OBSERVAÇÕES: Estes valores de portabilidade são valores
				aproximados para assertividade dos valores é preciso aguarda o
				retorno TOTAL da dívida junto ao banco e a possibilidade de
				conseguir seguir devído as regras de cada banco.
			</h3>
			<CalculatorResult result={resultTrocoLiquido} />
			<CalculatorTotal total={total} />
		</div>
	);
}
