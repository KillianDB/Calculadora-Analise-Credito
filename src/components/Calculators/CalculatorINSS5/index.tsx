import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS5.css";
import { formatNumber } from "../../../utils/formatNumbers";

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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [resultsPossibilidade, setResultsPossibilidade] = useState([
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [parcelas, setParcelas] = useState([
		{ label: "PARCELA-1", value: 0 },
		{ label: "PARCELA-2", value: 0 },
		{ label: "PARCELA-3", value: 0 },
		{ label: "PARCELA-4", value: 0 },
		{ label: "PARCELA-5", value: 0 },
		{ label: "PARCELA-6", value: 0 },
		{ label: "PARCELA-7", value: 0 },
	]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [saldos, setSaldos] = useState([
		{ label: "SALDO DEVEDOR-1", value: 0 },
		{ label: "SALDO DEVEDOR-2", value: 0 },
		{ label: "SALDO DEVEDOR-3", value: 0 },
		{ label: "SALDO DEVEDOR-4", value: 0 },
		{ label: "SALDO DEVEDOR-5", value: 0 },
		{ label: "SALDO DEVEDOR-6", value: 0 },
		{ label: "SALDO DEVEDOR-7", value: 0 },
	]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [possibilidades, setPossibilidades] = useState([
		{ label: "POSSIBILIDADE-1", value: 0 },
		{ label: "POSSIBILIDADE-2", value: 0 },
		{ label: "POSSIBILIDADE-3", value: 0 },
		{ label: "POSSIBILIDADE-4", value: 0 },
		{ label: "POSSIBILIDADE-5", value: 0 },
		{ label: "POSSIBILIDADE-6", value: 0 },
		{ label: "POSSIBILIDADE-7", value: 0 },
	]);
	const [values, setValues] = useState([
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
		{ label: "VALOR MARGEM CARTÃO INSS: ", value: 0 },
		{
			label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
			value: 0,
		},
		{ label: "valor liquido aproximado", value: 0 },
		{ label: "total parcelas", value: 0 },
		{ label: "total saldo devedor", value: 0 },
	]);

	useEffect(() => {
		const allFilled = values.slice(0, 3).every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	function handleInputValue(label: string, value: number) {
		let result: string[] | "no valid labels" | undefined = [];
		if (label.includes("PARCELA") || label.includes("SALDO DEVEDOR")) {
			console.log("ta no if do handleInputValue");
			console.log("label", label);
			console.log("value", value);
			if (label == "PARCELA-1") {
				setParcelas((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
				// parcelas[0].value = value;
				setPossibilidades((prevState) => {
					prevState[0].value = value / 0.0223 - saldos[0].value;
					return [...prevState];
				});
				// possibilidades[0].value = value / 0.0223 - saldos[0].value;
				setResultsPossibilidade((prevState) => {
					prevState[0].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[0].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[0].value = ` R$ ${formatNumber(
				// 	possibilidades[0].value
				// )}`;
			} else if (label == "PARCELA-2") {
				setParcelas((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
				// parcelas[1].value = value;
				setPossibilidades((prevState) => {
					prevState[1].value = value / 0.0223 - saldos[1].value;
					return [...prevState];
				});
				// possibilidades[1].value = value / 0.0223 - saldos[1].value;
				setResultsPossibilidade((prevState) => {
					prevState[1].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[1].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[1].value = ` R$ ${formatNumber(
				// 	possibilidades[1].value
				// )}`;
			} else if (label == "PARCELA-3") {
				setParcelas((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
				// parcelas[2].value = value;
				setPossibilidades((prevState) => {
					prevState[2].value = value / 0.0223 - saldos[2].value;
					return [...prevState];
				});
				// possibilidades[2].value = value / 0.0223 - saldos[2].value;
				setResultsPossibilidade((prevState) => {
					prevState[2].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[2].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[2].value = ` R$ ${formatNumber(
				// 	possibilidades[2].value
				// )}`;
			} else if (label == "PARCELA-4") {
				setParcelas((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
				// parcelas[3].value = value;
				setPossibilidades((prevState) => {
					prevState[3].value = value / 0.0223 - saldos[3].value;
					return [...prevState];
				});
				// possibilidades[3].value = value / 0.0223 - saldos[3].value;
				setResultsPossibilidade((prevState) => {
					prevState[3].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[3].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[3].value = ` R$ ${formatNumber(
				// 	possibilidades[3].value
				// )}`;
			} else if (label == "PARCELA-5") {
				setParcelas((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
				// parcelas[4].value = value;
				setPossibilidades((prevState) => {
					prevState[4].value = value / 0.0223 - saldos[4].value;
					return [...prevState];
				});
				// possibilidades[4].value = value / 0.0223 - saldos[4].value;
				setResultsPossibilidade((prevState) => {
					prevState[4].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[4].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[4].value = ` R$ ${formatNumber(
				// 	possibilidades[4].value
				// )}`;
			} else if (label == "PARCELA-6") {
				setParcelas((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
				// parcelas[5].value = value;
				setPossibilidades((prevState) => {
					prevState[5].value = value / 0.0223 - saldos[5].value;
					return [...prevState];
				});
				// possibilidades[5].value = value / 0.0223 - saldos[5].value;
				setResultsPossibilidade((prevState) => {
					prevState[5].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[5].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[5].value = ` R$ ${formatNumber(
				// 	possibilidades[5].value
				// )}`;
			} else if (label == "PARCELA-7") {
				setParcelas((prevState) => {
					prevState[6].value = value;
					return [...prevState];
				});
				// parcelas[6].value = value;
				setPossibilidades((prevState) => {
					prevState[6].value = value / 0.0223 - saldos[6].value;
					return [...prevState];
				});
				// possibilidades[6].value = value / 0.0223 - saldos[6].value;
				setResultsPossibilidade((prevState) => {
					prevState[6].value = ` R$ ${formatNumber(
						value / 0.0223 - saldos[6].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[6].value = ` R$ ${formatNumber(
				// 	possibilidades[6].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-1") {
				setSaldos((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
				// saldos[0].value = value;
				setPossibilidades((prevState) => {
					prevState[0].value = parcelas[0].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[0].value = parcelas[0].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[0].value = ` R$ ${formatNumber(
						parcelas[0].value / 0.0223 - value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[0].value = ` R$ ${formatNumber(
				// 	possibilidades[0].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-2") {
				setSaldos((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
				// saldos[1].value = value;
				setPossibilidades((prevState) => {
					prevState[1].value = parcelas[1].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[1].value = parcelas[1].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[1].value = ` R$ ${formatNumber(
						parcelas[1].value / 0.0223 - value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[1].value = ` R$ ${formatNumber(
				// 	possibilidades[1].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-3") {
				setSaldos((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
				// saldos[2].value = value;
				setPossibilidades((prevState) => {
					prevState[2].value = parcelas[2].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[2].value = parcelas[2].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[2].value = `R$ ${formatNumber(
						possibilidades[2].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[2].value = ` R$ ${formatNumber(
				// 	possibilidades[2].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-4") {
				setSaldos((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
				// saldos[3].value = value;
				setPossibilidades((prevState) => {
					prevState[3].value = parcelas[3].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[3].value = parcelas[3].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[3].value = `R$ ${formatNumber(
						possibilidades[3].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[3].value = ` R$ ${formatNumber(
				// 	possibilidades[3].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-5") {
				setSaldos((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
				// saldos[4].value = value;
				setPossibilidades((prevState) => {
					prevState[4].value = parcelas[4].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[4].value = parcelas[4].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[4].value = ` R$ ${formatNumber(
						possibilidades[4].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[4].value = ` R$ ${formatNumber(
				// 	possibilidades[4].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-6") {
				setSaldos((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
				// saldos[5].value = value;
				setPossibilidades((prevState) => {
					prevState[5].value = parcelas[5].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[5].value = parcelas[5].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[5].value = ` R$ ${formatNumber(
						possibilidades[5].value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[5].value = ` R$ ${formatNumber(
				// 	possibilidades[5].value
				// )}`;
			} else if (label == "SALDO DEVEDOR-7") {
				setSaldos((prevState) => {
					prevState[6].value = value;
					return [...prevState];
				});
				// saldos[6].value = value;
				setPossibilidades((prevState) => {
					prevState[6].value = parcelas[6].value / 0.0223 - value;
					return [...prevState];
				});
				// possibilidades[6].value = parcelas[6].value / 0.0223 - value;
				setResultsPossibilidade((prevState) => {
					prevState[6].value = ` R$ ${formatNumber(
						parcelas[6].value / 0.0223 - value
					)}`;
					return [...prevState];
				});
				// resultsPossibilidade[6].value = ` R$ ${formatNumber(
				// 	possibilidades[6].value
				// )}`;
			}
		} else {
			console.log("ta no else do handleInputValue");
			console.log("label", label);
			console.log("value", value);
			if (label == "VALOR MARGEM EMPRÉSTIMO: ") {
				setValues((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
			} else if (label == "VALOR MARGEM CARTÃO INSS: ") {
				setValues((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
			} else if (label == "VALOR MARGEM CARTÃO BENEFÍCIO: ") {
				setValues((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
			} else if (label == "valor liquido aproximado") {
				setValues((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
			} else if (label == "total parcelas") {
				setValues((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
			} else if (label == "total saldo devedor") {
				setValues((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
			}
			// const updatedValues = values.map((item) =>
			// 	item.label === label ? { ...item, value } : item
			// );
			// setValues(updatedValues);
		}
		let portabilidade: number = 0;
		let totalParcelas: number = 0;
		let totalSaldoDevedor: number = 0;
		possibilidades.map((item) => {
			if (item.label.includes("POSSIBILIDADE") && item.value > 0) {
				portabilidade += item.value;
				totalParcelas += parcelas[+item.label.split("-")[1] - 1].value;
				totalSaldoDevedor +=
					saldos[+item.label.split("-")[1] - 1].value;
			}
		});
		setValues((prevState) => {
			prevState[3].value = portabilidade;
			return [...prevState];
		});
		// values[3].value = portabilidade;
		setValues((prevState) => {
			prevState[4].value = totalParcelas;
			return [...prevState];
		});
		// values[4].value = totalParcelas;
		setValues((prevState) => {
			prevState[5].value = totalSaldoDevedor;
			return [...prevState];
		});
		// values[5].value = totalSaldoDevedor;
		result = calculate("INSS", "Possibilidades Gerais", values);
		if (
			result != "no valid labels" &&
			result != undefined &&
			result.length != 0
		) {
			setResults(result.slice(0, 15));
			// setResultsPossibilidade(result.slice(15, 22));
			setResultTotalPossibilidade(result.slice(15, 18));
			setResultsTrocoLiquido(result[18]);
			setTotal(result.slice(19, 22));

			const finalResult = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split("$ ")[1]} 84x`,
				`Valor Cartão R$ ${result[22]}`,
				`Parcela Cartão R$ ${result[23]} 84x`,
				`Valor Compras R$ ${result[24]}`,
				`Parcela Compras R$ ${result[25]} 84x`,
				`Portabilidade Aproximada R$ ${formatNumber(portabilidade)}`,
				"Parcela RNão Altera",
				`${result[19].split(" R$ ")[1]}`,
				`${result[20].split(" R$ ")[1]} 84x`,
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
								handleInputValue(label, +e.target.value)
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
						{parcelas.map((parcela) => (
							<CalculatorInput
								key={parcela.label}
								label={parcela.label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(
										parcela.label,
										+e.target.value
									)
								}
							/>
						))}
					</div>
					<div className='saldoPossibilidades'>
						{saldos.map((saldo) => (
							<CalculatorInput
								key={saldo.label}
								label={saldo.label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(
										saldo.label,
										+e.target.value
									)
								}
							/>
						))}
					</div>
					<div className='possibilidadesPossibilidades'>
						{resultsPossibilidade.map(
							(result: { label: string; value: string }) => (
								<CalculatorResult
									result={result.label + result.value}
								/>
							)
						)}
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
