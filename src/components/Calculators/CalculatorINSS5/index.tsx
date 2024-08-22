import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS5.css";

export function CalculatorINSS5({
	setAllInputsFilled,
	setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [results, setResults] = useState([
		"VALOR EMPRESTIMO: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"84x",
		"CARTAO INSS: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"84x",
		"VALOR COMPRAS: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"84x",
		"CARTÃO BENEFICIO: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"84x",
		"VALOR COMPRAS: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"84x",
	]);
	const [resultsPossibilidade, setResultsPossibilidade] = useState([
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
		"POSSIBILIDADE R$ 000,00",
	]);
	const [resultTotalPossibilidade, setResultTotalPossibilidade] = useState([
		"TOTAL DAS PARCELAS: R$ 000,00",
		"TOTAL SALDO DEVEDOR: R$ 000,00",
		"VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: R$ 000,00",
	]);
	const [resultTrocoLiquido, setResultsTrocoLiquido] = useState(
		"TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): R$ 000,00"
	);
	const [total, setTotal] = useState([
		"TOTAL R$ 00.000,00",
		"PARCELA - R$ 000,00",
		"84x",
	]);
	const labels: string[] = [
		"VALOR MARGEM EMPRÉSTIMO: ",
		"VALOR MARGEM CARTÃO INSS: ",
		"VALOR MARGEM CARTÃO BENEFÍCIO: ",
	];
	const labelsParcela: string[] = [
		"PARCELA -1",
		"PARCELA -2",
		"PARCELA -3",
		"PARCELA -4",
		"PARCELA -5",
		"PARCELA -6",
		"PARCELA -7",
	];
	const labelsSaldo: string[] = [
		"SALDO DEVEDOR -1",
		"SALDO DEVEDOR -2",
		"SALDO DEVEDOR -3",
		"SALDO DEVEDOR -4",
		"SALDO DEVEDOR -5",
		"SALDO DEVEDOR -6",
		"SALDO DEVEDOR -7",
	];
	const [values, setValues] = useState([
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
	]);

	useEffect(() => {
		const allFilled = values.slice(0, 3).every((item) => item.value !== "");
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	function handleInputValue(label: string, value: string) {
		const updatedValues = values.map((item) =>
			item.label === label ? { ...item, value } : item
		);
		setValues(updatedValues);

		const result = calculate("INSS", "Possibilidades Gerais", values);
		if (result != "no valid labels" && result != undefined) {
			setResults(result.slice(0, 15));
			setResultsPossibilidade(result.slice(15, 22));
			setResultTotalPossibilidade(result.slice(22, 25));
			setResultsTrocoLiquido(result[25]);
			setTotal(result.slice(26, 30));

			const finalResult = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split("$ ")[1]} 84x`,
				`Valor Cartão R$ ${
					+result[3].split("$ ")[1] + +result[9].split("$ ")[1]
				}`,
				`Parcela Cartão R$ ${
					+result[4].split(" R$ ") + +result[10].split(" R$ ")
				} 84x`,
				`Valor Compras R$ ${
					+result[6].split(" R$ ")[1] + +result[12].split(" R$ ")[1]
				}`,
				`Parcela Compras R$ ${
					+result[7].split(" R$ ")[1] + +result[13].split(" R$ ")[1]
				} 84x`,
				`Portabilidade Aproximada R$ ${result[25].split(" R$ ")[1]}`,
				"Parcela Não Altera",
				`${result[26].split(" R$ ")[1]}`,
				`${result[27].split(" R$ ")[1]} 84x`,
			];
			setFinalResult(finalResult);
		}
	}

	return (
		<div className='calculatorComponentDivPossibilidades'>
			<section className='mainContainerPossibilidades'>
				<CalculatorTitle menu='INSS' submenu='Possibilidades Gerais' />
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
				<div className='resultsContainerPossibilidades'>
					{results.map((result: string) => (
						// <div className='empty-column'></div>
						<CalculatorResult result={result} />
					))}
				</div>
			</section>
			<div className='secondContainerPossibilidades'>
				<h3>
					NÃO PORTAMOS OS BANCO FACTA 935 - BANCO SEGURO 081 E BRB
				</h3>
				<h4>Calculadora de Portabilidade</h4>
				<section className='mainSecondContainerPossibilidades'>
					<div className='parcelasPossibilidades'>
						{labelsParcela.map((label: string) => (
							<CalculatorInput
								key={label}
								label={label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(label, e.target.value)
								}
							/>
						))}
					</div>
					<div className='saldoPossibilidades'>
						{labelsSaldo.map((label: string) => (
							<CalculatorInput
								key={label}
								label={label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(label, e.target.value)
								}
							/>
						))}
					</div>
					<div className='possibilidadesPossibilidades'>
						{resultsPossibilidade.map((result: string) => (
							<CalculatorResult result={result} />
						))}
					</div>
				</section>
				<div className='resultadosPossibilidades'>
					<CalculatorResult result={resultTotalPossibilidade[0]} />
					<CalculatorResult result={resultTotalPossibilidade[1]} />
					<CalculatorResult result={resultTotalPossibilidade[2]} />
				</div>
				<h3 id='obs'>
					OBSERVAÇÕES: Estes valores de portabilidade são valores
					aproximados para assertividade dos valores é preciso aguarda
					o retorno TOTAL da dívida junto ao banco e a possibilidade
					de conseguir seguir devído as regras de cada banco.
				</h3>
				<div id='trocoLiquidoDiv'>
					<CalculatorResult result={resultTrocoLiquido} />
					<p>NÃO ALTERA O VALOR DAS PARCELAS</p>
				</div>
				<div className='totaisContainer'>
					<CalculatorTotal total={total[0]} />
					<CalculatorTotal total={total[1]} />
					<CalculatorTotal total={total[2]} />
				</div>
			</div>
		</div>
	);
}
