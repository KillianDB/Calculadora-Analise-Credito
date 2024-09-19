import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
// import { formatNumber } from "../../../utils/formatNumbers";
import "./exercito.css";
import Input from "../../Input";

export function CalculatorExercito2({
	setAllInputsFilled,
	setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [results, setResults] = useState([
		"VALOR EMPRESTIMO: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"72x",
		"TROCO LÍQUIDO PORTABILIDADE: R$ 00.000,00",
		"PARCELA: R$ 000,00",
		"72x",
	]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [resultsPossibilidade] = useState([
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
		{ label: "CÁLCULO DE PORTABILIDADE RÁPIDA", value: " R$ 000,00" },
	]);
	const [total, setTotal] = useState([
		"TOTAL R$ 00.000,00",
		"PARCELA - R$ 000,00",
		"72x",
	]);
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
	const [prazos, setPrazos] = useState([
		{ label: "PRAZO RESTANTE-1", value: 0 },
		{ label: "PRAZO RESTANTE-2", value: 0 },
		{ label: "PRAZO RESTANTE-3", value: 0 },
		{ label: "PRAZO RESTANTE-4", value: 0 },
		{ label: "PRAZO RESTANTE-5", value: 0 },
		{ label: "PRAZO RESTANTE-6", value: 0 },
		{ label: "PRAZO RESTANTE-7", value: 0 },
	]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [taxas, setTaxas] = useState([
		{ label: "TAXA DE JUROS-1", value: 0 },
		{ label: "TAXA DE JUROS-2", value: 0 },
		{ label: "TAXA DE JUROS-3", value: 0 },
		{ label: "TAXA DE JUROS-4", value: 0 },
		{ label: "TAXA DE JUROS-5", value: 0 },
		{ label: "TAXA DE JUROS-6", value: 0 },
		{ label: "TAXA DE JUROS-7", value: 0 },
	]);
	const [values, setValues] = useState([
		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
	]);

	useEffect(() => {
		const allFilled = values.slice(0, 3).every((item) => item.value !== 0);
		setAllInputsFilled(allFilled);
	}, [values, setAllInputsFilled]);

	function handleInputValue(label: string, value: number) {
		let result: string[] | "no valid labels" | undefined = [];
		if (
			label.includes("PARCELA") ||
			label.includes("PRAZO RESTANTE") ||
			label.includes("TAXA DE JUROS")
		) {
			console.log("ta no if do handleInputValue");
			console.log("label", label);
			console.log("value", value);
			if (label == "PARCELA-1") {
				setParcelas((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
				// parcelas[0].value = value;
				// possibilidades[0].value = value / 0.0223 - prazos[0].value;
				// resultsPossibilidade[0].value = ` R$ ${formatNumber(
				// 	possibilidades[0].value
				// )}`;
			} else if (label == "PARCELA-2") {
				setParcelas((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
				// parcelas[1].value = value;
				// possibilidades[1].value = value / 0.0223 - prazo[1].value;
				// resultsPossibilidade[1].value = ` R$ ${formatNumber(
				// 	possibilidades[1].value
				// )}`;
			} else if (label == "PARCELA-3") {
				setParcelas((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
				// parcelas[2].value = value;
				// possibilidades[2].value = value / 0.0223 - prazo[2].value;
				// resultsPossibilidade[2].value = ` R$ ${formatNumber(
				// 	possibilidades[2].value
				// )}`;
			} else if (label == "PARCELA-4") {
				setParcelas((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
				// parcelas[3].value = value;
				// possibilidades[3].value = value / 0.0223 - prazo[3].value;
				// resultsPossibilidade[3].value = ` R$ ${formatNumber(
				// 	possibilidades[3].value
				// )}`;
			} else if (label == "PARCELA-5") {
				setParcelas((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
				// parcelas[4].value = value;
				// possibilidades[4].value = value / 0.0223 - prazo[4].value;
				// resultsPossibilidade[4].value = ` R$ ${formatNumber(
				// 	possibilidades[4].value
				// )}`;
			} else if (label == "PARCELA-6") {
				setParcelas((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
				// parcelas[5].value = value;
				// possibilidades[5].value = value / 0.0223 - prazo[5].value;
				// resultsPossibilidade[5].value = ` R$ ${formatNumber(
				// 	possibilidades[5].value
				// )}`;
			} else if (label == "PARCELA-7") {
				setParcelas((prevState) => {
					prevState[6].value = value;
					return [...prevState];
				});
				// parcelas[6].value = value;
				// possibilidades[6].value = value / 0.0223 - prazo[6].value;
				// resultsPossibilidade[6].value = ` R$ ${formatNumber(
				// 	possibilidades[6].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-1") {
				setPrazos((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
				// prazo[0].value = value;
				// possibilidades[0].value = parcelas[0].value / 0.0223 - value;
				// resultsPossibilidade[0].value = ` R$ ${formatNumber(
				// 	possibilidades[0].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-2") {
				setPrazos((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
				// prazo[1].value = value;
				// possibilidades[1].value = parcelas[1].value / 0.0223 - value;
				// resultsPossibilidade[1].value = ` R$ ${formatNumber(
				// 	possibilidades[1].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-3") {
				setPrazos((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
				// prazo[2].value = value;
				// possibilidades[2].value = parcelas[2].value / 0.0223 - value;
				// resultsPossibilidade[2].value = ` R$ ${formatNumber(
				// 	possibilidades[2].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-4") {
				setPrazos((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
				// prazo[3].value = value;
				// possibilidades[3].value = parcelas[3].value / 0.0223 - value;
				// resultsPossibilidade[3].value = ` R$ ${formatNumber(
				// 	possibilidades[3].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-5") {
				setPrazos((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
				// prazo[4].value = value;
				// possibilidades[4].value = parcelas[4].value / 0.0223 - value;
				// resultsPossibilidade[4].value = ` R$ ${formatNumber(
				// 	possibilidades[4].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-6") {
				setPrazos((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
				// prazo[5].value = value;
				// possibilidades[5].value = parcelas[5].value / 0.0223 - value;
				// resultsPossibilidade[5].value = ` R$ ${formatNumber(
				// 	possibilidades[5].value
				// )}`;
			} else if (label == "PRAZO RESTANTE-7") {
				setPrazos((prevState) => {
					prevState[6].value = value;
					return [...prevState];
				});
				// prazo[6].value = value;
				// possibilidades[6].value = parcelas[6].value / 0.0223 - value;
				// resultsPossibilidade[6].value = ` R$ ${formatNumber(
				// 	possibilidades[6].value
				// )}`;
			} else if (label == "TAXA DE JUROS-1") {
				setTaxas((prevState) => {
					prevState[0].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-2") {
				setTaxas((prevState) => {
					prevState[1].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-3") {
				setTaxas((prevState) => {
					prevState[2].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-4") {
				setTaxas((prevState) => {
					prevState[3].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-5") {
				setTaxas((prevState) => {
					prevState[4].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-6") {
				setTaxas((prevState) => {
					prevState[5].value = value;
					return [...prevState];
				});
			} else if (label == "TAXA DE JUROS-7") {
				setTaxas((prevState) => {
					prevState[6].value = value;
					return [...prevState];
				});
			}
		} else {
			console.log("ta no else do handleInputValue");
			console.log("label", label);
			console.log("value", value);
			const updatedValues = values.map((item) =>
				item.label === label ? { ...item, value } : item
			);
			setValues(updatedValues);
		}
		// let portabilidade: number = 0;
		// let totalParcelas: number = 0;
		// let totalSaldoDevedor: number = 0;
		// possibilidades.map((item) => {
		// 	if (item.label.includes("POSSIBILIDADE") && item.value > 0) {
		// 		portabilidade += item.value;
		// 		totalParcelas += parcelas[+item.label.split("-")[1] - 1].value;
		// 		totalSaldoDevedor += prazo[+item.label.split("-")[1] - 1].value;
		// 	}
		// });
		// values[3].value = portabilidade;
		// values[4].value = totalParcelas;
		// values[5].value = totalSaldoDevedor;
		result = calculate("Exército", "Possibilidades Gerais", values);
		if (
			result != "no valid labels" &&
			result != undefined &&
			result.length != 0
		) {
			setResults(result.slice(0, 15));
			setTotal(result.slice(19, 22));

			const finalResult = [
				"Bem vindo, Cliente CR",
				`Valor Empréstimo R$ ${result[0].split("$ ")[1]}`,
				`Valor Parcela R$ ${result[1].split("$ ")[1]} 84x`,
				`Valor Cartão R$ ${result[22]}`,
				`Parcela Cartão R$ ${result[23]} 84x`,
				`Valor Compras R$ ${result[24]}`,
				`Parcela Compras R$ ${result[25]} 84x`,
				// `Portabilidade Aproximada R$ ${formatNumber(portabilidade)}`,
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
				<CalculatorTitle
					menu='Exército'
					submenu='Possibilidades Gerais'
				/>
				<div className='inputsContainer'>
					<CalculatorInput
						key={values[0].label}
						label={values[0].label}
						onChange={(e) =>
							handleInputValue(values[0].label, +e.target.value)
						}
					/>
				</div>
			</section>
			<div className='secondContainerPossibilidades'>
				<h4 className='h4CalculadoraDePortabilidadeRapida'>
					Calculadora de Portabilidade Rápida
				</h4>
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
						{prazos.map((prazo) => (
							<Input
								key={prazo.label}
								type='number'
								label={prazo.label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(
										prazo.label,
										+e.target.value
									)
								}
							/>
						))}
					</div>
					<div className='jurosPossibilidades'>
						{taxas.map((taxa) => (
							<CalculatorInput
								key={taxa.label}
								label={taxa.label.split("-")[0]}
								onChange={(e) =>
									handleInputValue(
										taxa.label,
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
					<div className='resultadosPossibilidades'>
						<CalculatorResult
							result={resultsPossibilidade[0].value}
						/>
						<CalculatorResult
							result={resultsPossibilidade[1].value}
						/>
						<CalculatorResult
							result={resultsPossibilidade[2].value}
						/>
					</div>
				</section>
				<h3>
					OBS: Estes valores são valores aproximados. Para
					assertividade dos valores é preciso aguardar o retorno do
					total da dívida junto ao banco e a possibilidade de
					conseguir seguir devido as regras de cada banco.
				</h3>
				<div className='resultsContainerPossibilidades'>
					{results.map((result: string) => (
						<CalculatorResult result={result} />
					))}
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
