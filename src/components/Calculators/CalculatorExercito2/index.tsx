// import { useEffect, useState } from "react";
// // import { calculate } from "../../../utils/calculate";
// import CalculatorInput from "../../CalculatorInput";
// import { CalculatorResult } from "../../CalculatorResult";
// import { CalculatorTitle } from "../../CalculatorTitle";
// import CalculatorTotal from "../../CalculatorTotal";
// import { formatNumber } from "../../../utils/formatNumbers";
// import "./exercito.css";

// export function CalculatorExercito2({
// 	setAllInputsFilled,
// 	setFinalResult,
// }: {
// 	setAllInputsFilled: (filled: boolean) => void;
// 	setFinalResult: (result: string[]) => void;
// }) {
// 	const [somaLiquidosArray, setSomaLiquidosArray] = useState<
// 		{ index: number; value: number }[]
// 	>([]);
// 	const somaLiquidos = 0;
// 	const somaParcelas = 0;
// 	const [indexCalc, setIndexCalc] = useState(0);
// 	const [results, setResults] = useState([
// 		//input 1/0.02385
// 		{ label: "VALOR EMPRESTIMO: R$ ", value: "000,00" },
// 		//valor input 1
// 		{ label: "PARCELA: R$ ", value: "000,00" },
// 		//soma do liquido cliente positivo
// 		{ label: "TROCO LÍQUIDO PORTABILIDADE: R$ ", value: "000,00" },
// 		//total parcelas positivo
// 		{ label: "PARCELA: R$ ", value: "000,00" },
// 	]);
// 	const [resultsPossibilidade, setResultsPossibilidade] = useState([
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "SALDO DEVEDOR", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 		{ label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
// 	]);
// 	const [total, setTotal] = useState([
// 		"TOTAL R$ 00.000,00",
// 		"PARCELA R$ 000,00",
// 		"72x",
// 	]);
// 	const [parcelas, setParcelas] = useState([
// 		{ label: "PARCELA-0", value: 0, index: 0 },
// 		{ label: "PARCELA-1", value: 0, index: 1 },
// 		{ label: "PARCELA-2", value: 0, index: 2 },
// 		{ label: "PARCELA-3", value: 0, index: 3 },
// 		{ label: "PARCELA-4", value: 0, index: 4 },
// 		{ label: "PARCELA-5", value: 0, index: 5 },
// 		{ label: "PARCELA-6", value: 0, index: 6 },
// 	]);

// 	const [prazos, setPrazos] = useState([
// 		{ label: "PRAZO RESTANTE-0", value: 0, index: 0 },
// 		{ label: "PRAZO RESTANTE-1", value: 0, index: 1 },
// 		{ label: "PRAZO RESTANTE-2", value: 0, index: 2 },
// 		{ label: "PRAZO RESTANTE-3", value: 0, index: 3 },
// 		{ label: "PRAZO RESTANTE-4", value: 0, index: 4 },
// 		{ label: "PRAZO RESTANTE-5", value: 0, index: 5 },
// 		{ label: "PRAZO RESTANTE-6", value: 0, index: 6 },
// 	]);

// 	const [taxas, setTaxas] = useState([
// 		{ label: "TAXA DE JUROS-0", value: 0, index: 0 },
// 		{ label: "TAXA DE JUROS-1", value: 0, index: 1 },
// 		{ label: "TAXA DE JUROS-2", value: 0, index: 2 },
// 		{ label: "TAXA DE JUROS-3", value: 0, index: 3 },
// 		{ label: "TAXA DE JUROS-4", value: 0, index: 4 },
// 		{ label: "TAXA DE JUROS-5", value: 0, index: 5 },
// 		{ label: "TAXA DE JUROS-6", value: 0, index: 6 },
// 	]);
// 	const [values, setValues] = useState([
// 		{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
// 	]);

// 	// useEffect(() => {
// 	// 	handleSetParcelas(0, 1);
// 	// 	handleSetTaxas(0, 1);
// 	// 	handleSetPrazos(1, 1);
// 	// }, []);

// 	useEffect(() => {
// 		const allFilled = values.every((item) => item.value !== 0);
// 		setAllInputsFilled(allFilled);
// 	}, [values, setAllInputsFilled]);

// 	useEffect(() => {
// 		console.log(prazos);
// 		if (prazos[indexCalc].value !== 0 && taxas[indexCalc].value !== 0) {
// 			if (parcelas[indexCalc].value !== 0) {
// 				console.log(prazos, parcelas, taxas);
// 				handleCalcular(prazos, parcelas, taxas, indexCalc);
// 			}
// 		}
// 	}, [parcelas, prazos, taxas, indexCalc]);

// 	const handleSetParcelas = (value: number, index: number) => {
// 		setIndexCalc(index);
// 		setParcelas((prevState) => {
// 			const newState = [...prevState];
// 			newState[index].value =
// 				typeof value === "string" ? parseFloat(value) : value;
// 			return newState;
// 		});
// 	};
// 	const handleSetPrazos = (value: number, index: number) => {
// 		setIndexCalc(index);
// 		setPrazos((prevState) => {
// 			const newState = [...prevState];
// 			newState[index].value =
// 				typeof value === "string" ? parseFloat(value) : value;
// 			return newState;
// 		});
// 	};
// 	const handleSetTaxas = (value: number, index: number) => {
// 		setIndexCalc(index);
// 		setTaxas((prevState) => {
// 			const newState = [...prevState];
// 			newState[index].value =
// 				typeof value === "string" ? parseFloat(value) : value;
// 			return newState;
// 		});
// 	};

// 	function handleCalcular(
// 		prazos: { label: string; value: number; index: number }[],
// 		parcelas: { label: string; value: number; index: number }[],
// 		taxas: { label: string; value: number; index: number }[],
// 		index: number
// 	) {
// 		const prazo = prazos[index].value;
// 		const parcela = parcelas[index].value;
// 		const taxa = taxas[index].value;

// 		const saldoDevedor =
// 			parcela / (taxa / 100) - parcela * (84 - prazo) * 0.45;
// 		const liquidoCliente = parcela / 0.0222 - saldoDevedor;
// 		console.log(`Saldo do clinete ${liquidoCliente}`);
// 		console.log(`Saldo do devedor ${saldoDevedor}`);
// 		setResultsPossibilidade((prevState) => {
// 			const newState = [...prevState];
// 			newState[index].value = ` R$ ${formatNumber(saldoDevedor)}`;
// 			newState[index + 7].value = ` R$ ${formatNumber(liquidoCliente)}`;
// 			return newState;
// 		});
// 		console.log(saldoDevedor, liquidoCliente);
// 		return [saldoDevedor, liquidoCliente];
// 	}

// 	function handleInputValue(label: string, value: number | string) {
// 		// 		const index = parseInt(label.split("-")[1]) - 1;
// 		// if( typeof index !== "number") return
// 		// 		if (
// 		// 			parcelas[index].value !== 0 &&
// 		// 			prazos[index].value !== 0 &&
// 		// 			taxas[index].value !== 0
// 		// 		) {
// 		// 			//parcela/taxa de juros - (parcela*(84-prazo)*45%)

// 		// 			const saldoDevedor =
// 		// 				parcelas[index].value / (taxas[index].value / 100) -
// 		// 				parcelas[index].value * (84 - prazos[index].value) * 0.45;
// 		// 			const liquidoCliente =
// 		// 				parcelas[index].value / 0.0222 - saldoDevedor;

// 		// 			setResultsPossibilidade((prevState) => {
// 		// 				const newState = [...prevState];
// 		// 				newState[index].value = ` R$ ${formatNumber(saldoDevedor)}`;
// 		// 				newState[index + 7].value = ` R$ ${formatNumber(
// 		// 					liquidoCliente
// 		// 				)}`;
// 		// 				return newState;
// 		// 			});
// 		// 			if (liquidoCliente > 0) {
// 		// 				setSomaLiquidosArray((prevState) => {
// 		// 					const newState = [...prevState];
// 		// 					newState[index] = {
// 		// 						index,
// 		// 						value:
// 		// 							(typeof value === "number"
// 		// 								? value
// 		// 								: parseFloat(value.toString())) +
// 		// 							liquidoCliente,
// 		// 					};
// 		// 					return newState;
// 		// 				});
// 		// 				somaParcelas += parcelas[index].value;
// 		// 				somaLiquidos = somaLiquidosArray.reduce(
// 		// 					(acc, curr) => acc + curr.value,
// 		// 					0
// 		// 				);
// 		// 				console.log("somaLiquidos antes de set", somaLiquidos);
// 		// 				setResults((prevState) => {
// 		// 					prevState[2].value = formatNumber(somaLiquidos);
// 		// 					// / 0.0222
// 		// 					// );
// 		// 					return [...prevState];
// 		// 				});
// 		// 				console.log("somaParcelas antes de set", somaParcelas);
// 		// 				setResults((prevState) => {
// 		// 					const newState = [...prevState];
// 		// 					newState[3].value = formatNumber(
// 		// 						typeof somaParcelas === "number"
// 		// 							? somaParcelas
// 		// 							: parseFloat(somaParcelas)
// 		// 					);
// 		// 					return newState;
// 		// 				});
// 		// 			}
// 		// 		} else {
// 		console.log("ta no else do handleInputValue");
// 		console.log("label", label);
// 		console.log("value", value);
// 		setValues((prevState) => {
// 			const newState = [...prevState]; // Cria uma cópia do estado anterior
// 			newState[0].value =
// 				typeof value === "number"
// 					? value
// 					: parseFloat(value.toString());
// 			return newState; // Retorna o novo estado

// 			// prevState[0].value =
// 			// 	typeof value === "number"
// 			// 		? value
// 			// 		: parseFloat(value.toString());
// 			// return [...prevState];
// 		});
// 		setResults((prevState) => {
// 			prevState[0].value = formatNumber(
// 				(typeof value === "number"
// 					? value
// 					: parseFloat(value.toString())) / 0.02385
// 			);
// 			return [...prevState];
// 		});
// 		setResults((prevState) => {
// 			prevState[1].value = formatNumber(
// 				typeof value === "number" ? value : parseFloat(value.toString())
// 			);
// 			return [...prevState];
// 		});
// 		setTotal((prevState) => {
// 			prevState[0] = `TOTAL R$ ${results[0].value}`;
// 			return [...prevState];
// 		});
// 		setTotal((prevState) => {
// 			prevState[1] = `PARCELA - R$ ${results[1].value}`;
// 			return [...prevState];
// 		});
// 		// }
// 		const finalResult = [
// 			"Bem vindo, Cliente CR",
// 			`Valor Empréstimo R$ ${results[0].value}`,
// 			`Parcela Empréstimo R$ ${results[1].value} 84x`,
// 			`Portabilidade Aprox. R$ ${results[2].value}`,
// 			`Parcela Portabilidade R$ ${results[3].value} 84x`,
// 			`${total[0].split(" R$ ")[1]}`,
// 			`${total[1].split(" R$ ")[1]} 84x`,
// 		];
// 		setFinalResult(finalResult);
// 		console.log("finalResult on exercito", finalResult);
// 	}

// 	return (
// 		<div className='calculatorComponentDivPossibilidadesExercito'>
// 			<section className='mainContainerPossibilidadesExercito'>
// 				<CalculatorTitle
// 					menu='Exército'
// 					submenu='Possibilidades Gerais'
// 				/>
// 				<div className='inputsContainerExercito'>
// 					<MoneyInput
// 	key={values[0].label}
// 	label={values[0].label}
// 	value={
// 		typeof values[0].value === "string"
// 			? parseFloat(values[0].value)
// 			: values[0].value
// 	}
// 	addOnBefore='R$'
// 	onChange={(e) => handleInputValue(e, values[0].label)}
// />
// 				</div>
// 			</section>
// 			<div className='secondContainerPossibilidadesExercito'>
// 				<h4 className='h4CalculadoraDePortabilidadeRapida'>
// 					Calculadora de Portabilidade Rápida
// 				</h4>
// 				<section className='mainSecondContainerPossibilidadesExercito'>
// 					<div className='parcelasPossibilidadesExercito'>
// 						{parcelas.map((parcela) => (
// 							<CalculatorInput
// 								key={parcela.label}
// 								label={parcela.label.split("-")[0]}
// 								onChange={(e) =>
// 									handleSetParcelas(
// 										+e.target.value,
// 										parcela.index
// 									)
// 								}
// 							/>
// 						))}
// 					</div>
// 					<div className='prazosPossibilidadesExercito'>
// 						{prazos.map((prazo) => (
// 							<CalculatorInput
// 								key={prazo.label}
// 								label={prazo.label.split("-")[0]}
// 								onChange={(e) =>
// 									handleSetPrazos(
// 										+e.target.value,
// 										prazo.index
// 									)
// 								}
// 							/>
// 						))}
// 					</div>
// 					<div className='jurosPossibilidadesExercito'>
// 						{taxas.map((taxa) => (
// 							<CalculatorInput
// 								key={taxa.label}
// 								label={taxa.label.split("-")[0]}
// 								onChange={(e) =>
// 									handleSetTaxas(
// 										parseFloat(
// 											e.target.value.replace(",", ".")
// 										),
// 										taxa.index
// 									)
// 								}
// 							/>
// 						))}
// 					</div>
// 					<div className='possibilidadesPossibilidadesExercito'>
// 						{resultsPossibilidade
// 							.slice(0, 7)
// 							.map((result: { label: string; value: string }) => (
// 								<CalculatorResult
// 									result={result.label + result.value}
// 								/>
// 							))}
// 					</div>
// 					<div className='possibilidadesPossibilidadesExercito'>
// 						{resultsPossibilidade
// 							.slice(7, 14)
// 							.map((result: { label: string; value: string }) => (
// 								<CalculatorResult
// 									result={result.label + result.value}
// 								/>
// 							))}
// 					</div>
// 				</section>
// 				<h3 className='obsExercito'>
// 					OBS: Estes valores são valores aproximados. Para
// 					assertividade dos valores é preciso aguardar o retorno do
// 					total da dívida junto ao banco e a possibilidade de
// 					conseguir seguir devido as regras de cada banco.
// 				</h3>
// 				<div className='resultsContainerPossibilidadesExercito'>
// 					{results.map((result) => (
// 						<CalculatorResult
// 							result={result.label + result.value}
// 						/>
// 					))}
// 				</div>
// 				<div className='totaisContainer'>
// 					{total.map((t) => (
// 						<CalculatorTotal total={t} />
// 					))}
// 					{/* <CalculatorTotal total={total[0]} />
// 					<CalculatorTotal total={total[1]} />
// 					<CalculatorTotal total={total[2]} /> */}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
