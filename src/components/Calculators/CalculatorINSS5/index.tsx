import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS5.css";
import { formatNumber } from "../../../utils/formatNumbers";
import { MoneyInput } from "../../MoneyInput";

export function CalculatorINSS5({
	setAllInputsFilled,
	setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [indexCalc, setIndexCalc] = useState(0);
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
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
		{ label: "POSSIBILIDADE", value: " R$ 000,00" },
	]);
	const [resultTotalPossibilidade, setResultTotalPossibilidade] = useState([
		{ label: "TOTAL DAS PARCELAS: R$ ", value: "000,00" },
		{ label: "TOTAL SALDO DEVEDOR: R$ ", value: "000,00" },
		{
			label: "VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: R$ ",
			value: "000,00",
		},
	]);
	const [resultTrocoLiquido, setResultsTrocoLiquido] = useState(
		"TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): R$ 000,00"
	);
	const [total, setTotal] = useState([
		"TOTAL R$ 00.000,00",
		"PARCELA R$ 000,00",
		"84x",
	]);
	const [parcelas, setParcelas] = useState([
		{ label: "PARCELA-0", value: 0, index: 0 },
		{ label: "PARCELA-1", value: 0, index: 1 },
		{ label: "PARCELA-2", value: 0, index: 2 },
		{ label: "PARCELA-3", value: 0, index: 3 },
		{ label: "PARCELA-4", value: 0, index: 4 },
		{ label: "PARCELA-5", value: 0, index: 5 },
		{ label: "PARCELA-6", value: 0, index: 6 },
	]);
	const [saldos, setSaldos] = useState([
		{ label: "SALDO DEVEDOR-0", value: 0, index: 0 },
		{ label: "SALDO DEVEDOR-1", value: 0, index: 1 },
		{ label: "SALDO DEVEDOR-2", value: 0, index: 2 },
		{ label: "SALDO DEVEDOR-3", value: 0, index: 3 },
		{ label: "SALDO DEVEDOR-4", value: 0, index: 4 },
		{ label: "SALDO DEVEDOR-5", value: 0, index: 5 },
		{ label: "SALDO DEVEDOR-6", value: 0, index: 6 },
	]);
	const [possibilidades, setPossibilidades] = useState([
		{ label: "POSSIBILIDADE-0", value: 0, index: 0 },
		{ label: "POSSIBILIDADE-1", value: 0, index: 1 },
		{ label: "POSSIBILIDADE-2", value: 0, index: 2 },
		{ label: "POSSIBILIDADE-3", value: 0, index: 3 },
		{ label: "POSSIBILIDADE-4", value: 0, index: 4 },
		{ label: "POSSIBILIDADE-5", value: 0, index: 5 },
		{ label: "POSSIBILIDADE-6", value: 0, index: 6 },
	]);
	const [values, setValues] = useState([
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
		{ label: "VALOR MARGEM CARTÃO INSS: ", value: 0 },
		{
			label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
			value: 0,
		},
	]);
	const [portabilidade, setPortabilidade] = useState(0);
	const [totalParcelas, setTotalParcelas] = useState(0);
	const [totalSaldoDevedor, setTotalSaldoDevedor] = useState(0);

	useEffect(() => {
		const allFilled = values.every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	useEffect(() => {
		console.log("saldos: ", saldos);
		if (saldos[indexCalc].value !== 0 && parcelas[indexCalc].value !== 0) {
			console.log("parcelas: ", parcelas);
			handleCalcular(parcelas, saldos, indexCalc);
		}
	}, [parcelas, saldos, indexCalc]);

	const handleSetParcelas = (value: number, index: number) => {
		setIndexCalc(index);
		setParcelas((prevState) => {
			const newState = [...prevState];
			newState[index].value =
				typeof value === "string" ? parseFloat(value) : value;
			return newState;
		});
	};
	const handleSetSaldos = (value: number, index: number) => {
		setIndexCalc(index);
		setSaldos((prevState) => {
			const newState = [...prevState];
			newState[index].value =
				typeof value === "string" ? parseFloat(value) : value;
			return newState;
		});
	};

	function handleCalcular(
		saldos: { label: string; value: number; index: number }[],
		parcelas: { label: string; value: number; index: number }[],
		index: number
	) {
		const parcela = parcelas[index].value;
		const saldo = saldos[index].value;

		setPossibilidades((prevState) => {
			prevState[index].value = parcela / 0.0223 - saldo;
			return [...prevState];
		});
		possibilidades.map((item) => {
			if (item.value > 0) {
				setPortabilidade(portabilidade + item.value);
				setTotalParcelas(
					totalParcelas +
						parcelas[+item.label.split("-")[1] - 1].value
				);
				setTotalSaldoDevedor(
					totalSaldoDevedor +
						saldos[+item.label.split("-")[1] - 1].value
				);
				setResultTotalPossibilidade((prevState) => {
					prevState[0].value = `${formatNumber(totalParcelas)}`;
					prevState[1].value = `${formatNumber(totalSaldoDevedor)}`;
					prevState[2].value = `${formatNumber(portabilidade)}`;
					return [...prevState];
				});
			}
		});
		setPortabilidade(portabilidade);
		// values[3].value = portabilidade;
		setTotalParcelas(totalParcelas);
		// values[4].value = totalParcelas;
		setTotalSaldoDevedor(totalSaldoDevedor);
	}

	function handleInputValue(
		event: React.ChangeEvent<HTMLInputElement>,
		label: string
	) {
		let result: string[] | "no valid labels" | undefined = [];

		console.log("label", label);
		console.log("event.target.value", event.target.value);
		if (label == "VALOR MARGEM EMPRÉSTIMO: ") {
			setValues((prevState) => {
				//troca o value pra string
				prevState[0].value = +event.target.value;
				return [...prevState];
			});
		} else if (label == "VALOR MARGEM CARTÃO INSS: ") {
			setValues((prevState) => {
				prevState[1].value = +event.target.value;
				return [...prevState];
			});
		} else if (label == "VALOR MARGEM CARTÃO BENEFÍCIO: ") {
			console.log("valor: ", event.target.value);
			setValues((prevState) => {
				prevState[2].value = +event.target.value;
				return [...prevState];
			});
		} else if (label == "valor liquido aproximado") {
			setValues((prevState) => {
				prevState[3].value = +event.target.value;
				return [...prevState];
			});
		} else if (label == "total parcelas") {
			setValues((prevState) => {
				prevState[4].value = +event.target.value;
				return [...prevState];
			});
		} else if (label == "total saldo devedor") {
			setValues((prevState) => {
				prevState[5].value = +event.target.value;
				return [...prevState];
			});
		}
		// const updatedValues = values.map((item) =>
		// 	item.label === label ? { ...item, value } : item
		// );
		// setValues(updatedValues);
		// }
		// let portabilidade: number = 0;
		// let totalParcelas: number = 0;
		// let totalSaldoDevedor: number = 0;
		// possibilidades.map((item) => {
		// 	if (item.label.includes("POSSIBILIDADE") && item.value > 0) {
		// 		portabilidade += item.value;
		// 		totalParcelas += parcelas[+item.label.split("-")[1] - 1].value;
		// 		totalSaldoDevedor +=
		// 			saldos[+item.label.split("-")[1] - 1].value;
		// 	}
		// });
		// setValues((prevState) => {
		// 	prevState[3].value = portabilidade.toString();
		// 	return [...prevState];
		// });
		// // values[3].value = portabilidade;
		// setValues((prevState) => {
		// 	prevState[4].value = totalParcelas.toString();
		// 	return [...prevState];
		// });
		// // values[4].value = totalParcelas;
		// setValues((prevState) => {
		// 	prevState[5].value = totalSaldoDevedor.toString();
		// 	return [...prevState];
		// });
		// values[5].value = totalSaldoDevedor;
		result = calculate(
			"INSS",
			"Possibilidades Gerais",
			values.map((item) => ({
				label: item.label,
				value: parseFloat(item.value.toString()),
			}))
		);
		if (
			result != "no valid labels" &&
			result != undefined &&
			result.length != 0
		) {
			setResults(result.slice(0, 15));
			setResultsPossibilidade(
				result.slice(15, 22).map((value, index) => ({
					label: `POSSIBILIDADE-${index}`,
					value: value.split(" R$ ")[1],
				}))
			);
			// setResultTotalPossibilidade(result.slice(15, 18));
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
					{values.slice(0, 4).map((value) => (
						<MoneyInput
							key={value.label}
							label={value.label}
							value={
								typeof value.value === "string"
									? parseFloat(value.value)
									: value.value
							}
							addOnBefore='R$'
							onChange={(e) => handleInputValue(e, value.label)}
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
									handleSetParcelas(
										+e.target.value,
										parcela.index
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
									handleSetSaldos(
										+e.target.value,
										saldo.index
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
					{resultTotalPossibilidade.map((result) => (
						<CalculatorResult
							result={result.label + result.value}
						/>
					))}
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
					{total.map((total) => (
						<CalculatorTotal total={total} />
					))}
				</div>
			</div>
		</div>
	);
}
