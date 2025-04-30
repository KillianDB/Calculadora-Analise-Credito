/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { CalculatorTitle } from "../../CalculatorTitle";
import "./calculatorINSS5.css";
import { NumericFormat } from "react-number-format";
import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";

export function CalculatorINSS5({
	setAllInputsFilled,
	// setFinalResult,
}: {
	setAllInputsFilled: (filled: boolean) => void;
	setFinalResult: (result: string[]) => void;
}) {
	const [indexCalc] = useState(0);
	// const allFilled = false;
	// const [results, setResults] = useState([
	//   "VALOR EMPRESTIMO: R$ 00.000,00",
	//   "PARCELA: R$ 000,00",
	//   "84x",
	//   "CARTAO INSS: R$ 00.000,00",
	//   "PARCELA: R$ 000,00",
	//   "84x",
	//   "VALOR COMPRAS: R$ 00.000,00",
	//   "PARCELA: R$ 000,00",
	//   "84x",
	//   "CARTÃO BENEFICIO: R$ 00.000,00",
	//   "PARCELA: R$ 000,00",
	//   "84x",
	//   "VALOR COMPRAS: R$ 00.000,00",
	//   "PARCELA: R$ 000,00",
	//   "84x",
	// ]);
	// const [resultsPossibilidade, setResultsPossibilidade] = useState([
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	//   { label: "POSSIBILIDADE", value: " R$ 000,00" },
	// ]);
	// const [resultTotalPossibilidade, setResultTotalPossibilidade] = useState([
	//   { label: "TOTAL DAS PARCELAS: R$ ", value: "000,00" },
	//   { label: "TOTAL SALDO DEVEDOR: R$ ", value: "000,00" },
	//   {
	//     label: "VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: R$ ",
	//     value: "000,00",
	//   },
	// ]);
	// const [resultTrocoLiquido, setResultsTrocoLiquido] = useState(
	//   "TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): R$ 000,00"
	// );
	// const [total, setTotal] = useState([
	//   "TOTAL R$ 00.000,00",
	//   "PARCELA R$ 000,00",
	//   "84x",
	// ]);
	const [parcelas] = useState([
		{ label: "PARCELA-0", value: 0, index: 0 },
		{ label: "PARCELA-1", value: 0, index: 1 },
		{ label: "PARCELA-2", value: 0, index: 2 },
		{ label: "PARCELA-3", value: 0, index: 3 },
		{ label: "PARCELA-4", value: 0, index: 4 },
		{ label: "PARCELA-5", value: 0, index: 5 },
		{ label: "PARCELA-6", value: 0, index: 6 },
	]);
	const [saldos] = useState([
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
	const [, setValues] = useState([
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
		console.log("saldos: ", saldos);
		if (saldos[indexCalc].value !== 0 && parcelas[indexCalc].value !== 0) {
			console.log("parcelas: ", parcelas);
			handleCalcular(parcelas, saldos, indexCalc);
		}
	}, [parcelas, saldos, indexCalc]);

	// const handleSetParcelas = (value: number, index: number) => {
	// 	setIndexCalc(index);
	// 	setParcelas((prevState) => {
	// 		const newState = [...prevState];
	// 		newState[index].value =
	// 			typeof value === "string" ? parseFloat(value) : value;
	// 		return newState;
	// 	});
	// };
	// const handleSetSaldos = (value: number, index: number) => {
	// 	setIndexCalc(index);
	// 	setSaldos((prevState) => {
	// 		const newState = [...prevState];
	// 		newState[index].value =
	// 			typeof value === "string" ? parseFloat(value) : value;
	// 		return newState;
	// 	});
	// };

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
				// setResultTotalPossibilidade((prevState) => {
				// 	prevState[0].value = `${formatNumber(totalParcelas)}`;
				// 	prevState[1].value = `${formatNumber(totalSaldoDevedor)}`;
				// 	prevState[2].value = `${formatNumber(portabilidade)}`;
				// 	return [...prevState];
				// });
			}
		});
		setPortabilidade(portabilidade);
		// values[3].value = portabilidade;
		setTotalParcelas(totalParcelas);
		// values[4].value = totalParcelas;
		setTotalSaldoDevedor(totalSaldoDevedor);
	}

	//   function handleInputValue(
	//     event: React.ChangeEvent<HTMLInputElement>,
	//     label: string
	//   ) {
	//     let result: string[] | "no valid labels" | undefined = [];

	//     if (label === "VALOR MARGEM EMPRÉSTIMO: ") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[0].value = +event.target.value;
	//         return newState;
	//       });
	//     } else if (label === "VALOR MARGEM CARTÃO INSS: ") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[1].value = +event.target.value;
	//         return newState;
	//       });
	//     } else if (label === "VALOR MARGEM CARTÃO BENEFÍCIO: ") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[2].value = +event.target.value;
	//         return newState;
	//       });
	//     } else if (label === "valor liquido aproximado") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[3].value = +event.target.value;
	//         return newState;
	//       });
	//     } else if (label === "total parcelas") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[4].value = +event.target.value;
	//         return newState;
	//       });
	//     } else if (label === "total saldo devedor") {
	//       setValues((prevState) => {
	//         const newState = [...prevState];
	//         newState[5].value = +event.target.value;
	//         return newState;
	//       });
	//     }

	//     }
	//   }

	const [margemEmprestimo, setMargememprestimo] = useState(0);
	const [margemCartaoInss, setMargemcartaoInss] = useState(0);
	const [margemCartaoBeneficio, setMargemcartaoBeneficio] = useState(0);

	const totalValores =
		margemEmprestimo / 0.02339 +
		margemCartaoInss * 22.67 +
		margemCartaoInss * 22.67 * 0.32 +
		margemCartaoBeneficio * 22.67 +
		margemCartaoBeneficio * 0.32;

	const totalparcelas =
		margemEmprestimo +
		margemCartaoInss * 0.7 +
		margemCartaoInss * 0.3 +
		margemCartaoBeneficio * 0.7 +
		margemCartaoBeneficio * 0.3;

	const [parcela1, setParcela1] = useState(0);
	const [parcela2, setParcela2] = useState(0);
	const [parcela3, setParcela3] = useState(0);
	const [parcela4, setParcela4] = useState(0);
	const [parcela5, setParcela5] = useState(0);
	const [parcela6, setParcela6] = useState(0);
	const [parcela7, setParcela7] = useState(0);
	const [saldoDevedor1, setSaldoDevedor1] = useState(0);
	const [saldoDevedor2, setSaldoDevedor2] = useState(0);
	const [saldoDevedor3, setSaldoDevedor3] = useState(0);
	const [saldoDevedor4, setSaldoDevedor4] = useState(0);
	const [saldoDevedor5, setSaldoDevedor5] = useState(0);
	const [saldoDevedor6, setSaldoDevedor6] = useState(0);
	const [saldoDevedor7, setSaldoDevedor7] = useState(0);

	const reducePArcelas = [
		parcela1,
		parcela2,
		parcela3,
		parcela4,
		parcela5,
		parcela6,
		parcela7,
	].reduce((acc, parcela, index) => {
		const possibilidade =
			parcela / 0.0223 - eval(`saldoDevedor${index + 1}`);
		return possibilidade >= 0 ? acc + parcela : acc;
	}, 0);

	const reduceSaldoDevedor = [
		saldoDevedor1,
		saldoDevedor2,
		saldoDevedor3,
		saldoDevedor4,
		saldoDevedor5,
		saldoDevedor6,
		saldoDevedor7,
	].reduce((acc, saldoDevedor, index) => {
		const possibilidade =
			eval(`parcela${index + 1}`) / 0.0223 - saldoDevedor;
		return possibilidade >= 0 ? acc + saldoDevedor : acc;
	}, 0);

	const reduceSaldoLiquidoAproximado = [
		parcela1,
		parcela2,
		parcela3,
		parcela4,
		parcela5,
		parcela6,
		parcela7,
	].reduce((acc, parcela, index) => {
		const possibilidade =
			parcela / 0.0223 - eval(`saldoDevedor${index + 1}`);
		return possibilidade >= 0 ? acc + possibilidade : acc;
	}, 0);

	useEffect(() => {
		const array = [
			margemEmprestimo,
			margemCartaoInss,
			margemCartaoBeneficio,
		];
		const allFilled = array.every((item) => item !== 0);
		setValues([
			{ label: "VALOR MARGEM EMPRÉSTIMO: ", value: margemEmprestimo },
			{ label: "VALOR MARGEM CARTÃO INSS: ", value: margemCartaoInss },
			{
				label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
				value: margemCartaoBeneficio,
			},
		]);
		setAllInputsFilled(allFilled);
	}, [
		margemEmprestimo,
		margemCartaoInss,
		margemCartaoBeneficio,
		setAllInputsFilled,
	]);

	// useEffect(() => {
	// 	const result = calculate(
	// 		"INSS",
	// 		"Possibilidades Gerais",
	// 		values.map((item) => ({
	// 			label: item.label,
	// 			value: parseFloat(item.value.toString()),
	// 		}))
	// 	);

	// 	if (
	// 		result !== "no valid labels" &&
	// 		result !== undefined &&
	// 		result.length !== 0
	// 	) {
	// 		setResults(result.slice(0, 15));
	// 		setResultsPossibilidade(
	// 			result.slice(15, 22).map((value, index) => ({
	// 				label: `POSSIBILIDADE-${index}`,
	// 				value: value.split(" R$ ")[1],
	// 			}))
	// 		);
	// 		setResultsTrocoLiquido(result[18]);
	// 		setTotal(result.slice(19, 22));

	// 		const finalResult = [
	// 			"Bem vindo, Cliente CR",
	// 			`Valor Empréstimo R$ ${result[0].split("$ ")[1]}`,
	// 			`Valor Parcela R$ ${result[1].split("$ ")[1]} 84x`,
	// 			`Valor Cartão R$ ${result[22]}`,
	// 			`Parcela Cartão R$ ${result[23]} 84x`,
	// 			`Valor Compras R$ ${result[24]}`,
	// 			`Parcela Compras R$ ${result[25]} 84x`,
	// 			`Portabilidade Aproximada R$ ${formatNumber(portabilidade)}`,
	// 			"Parcela RNão Altera",
	// 			`${result[19].split(" R$ ")[1]}`,
	// 			`${result[20].split(" R$ ")[1]} 84x`,
	// 		];
	// 		setFinalResult(finalResult);
	// 	}
	// }, [allInputsFilled, setFinalResult, values]);

	return (
		<div className='calculatorComponentDivPossibilidades'>
			<Flex
				flexDir={"column"}
				shadow={"md"}
				dropShadow={"2xl"}
				boxShadow={"lg"}
				alignItems={"center"}
				p={3}
			>
				<CalculatorTitle menu='INSS' submenu='Possibilidades Gerais' />
				<Flex
					w={"25vw"}
					mt={2}
					flexDir={"column"}
					alignItems={"center"}
				>
					<FormControl>
						<FormLabel>VALOR MARGEM EMPRÉSTIMO: </FormLabel>
						<InputGroup>
							<NumericFormat
								value={margemEmprestimo}
								onValueChange={(values) => {
									const { floatValue } = values;
									setMargememprestimo(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								prefix="R$ "
								decimalScale={2}
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel>VALOR MARGEM CARTÃO INSS: </FormLabel>
						<InputGroup>
							<NumericFormat
								value={margemCartaoInss}
								onValueChange={(values) => {
									const { floatValue } = values;
									setMargemcartaoInss(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								prefix="R$ "
								decimalScale={2}
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel>VALOR MARGEM CARTÃO BENEFÍCIO: </FormLabel>
						<InputGroup>
							<NumericFormat
								value={margemCartaoBeneficio}
								onValueChange={(values) => {
									const { floatValue } = values;
									setMargemcartaoBeneficio(
										Number(floatValue)
									);
								}}
								thousandSeparator='.'
								decimalSeparator=','
								prefix="R$ "
								decimalScale={2}
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</InputGroup>
					</FormControl>
				</Flex>
				<SimpleGrid
					columns={3}
					spacingX={8}
					spacingY={2}
					w={"60vw"}
					mt={2}
					mx={"auto"}
				>
					<Text fontSize={"14px"}>{`VALOR EMPRÉSTIMO:  ${(
						margemEmprestimo / 0.02339
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text
						fontSize={"14px"}
					>{`PARCELA: ${margemEmprestimo.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`84x`}</Text>
					<Text fontSize={"14px"}>{`CARTÃO INSS: ${(
						margemCartaoInss * 22.67
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`PARCELA:${(
						margemCartaoInss * 0.7
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`84x`}</Text>
					<Text fontSize={"14px"}>{`VALOR COMPRAS: ${(
						margemCartaoInss *
						22.67 *
						0.32
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`PARCELA: ${(
						margemCartaoInss * 0.3
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`84x`}</Text>
					<Text fontSize={"14px"}>{`CARTÃO BENEFÍCIO: ${(
						margemCartaoBeneficio * 22.67
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`PARCELA: ${(
						margemCartaoBeneficio * 0.7
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`84x`}</Text>
					<Text fontSize={"14px"}>{`VALOR COMPRAS: ${(
						margemCartaoBeneficio * 0.32
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`PARCELA: ${(
						margemCartaoBeneficio * 0.3
					).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text fontSize={"14px"}>{`84x`}</Text>
				</SimpleGrid>
			</Flex>
			<div className='secondContainerPossibilidades'>
				<h3>
					NÃO PORTAMOS OS BANCO FACTA 935 - BANCO SEGURO 081 E BRB
				</h3>
				<h4>Calculadora de Portabilidade</h4>
				<section className='mainSecondContainerPossibilidades'>
					<SimpleGrid
						columns={3}
						spacingX={8}
						spacingY={2}
						w={"80%"}
						mt={2}
						mx={"auto"}
					>
						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela1}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela1(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								prefix='R$ '
								decimalScale={2}
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor1}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor1(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								fixedDecimalScale={true}
								prefix='R$ '
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela1 / 0.0223 -
									saldoDevedor1
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela2}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela2(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								fixedDecimalScale={true}
								prefix='R$ '
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor2}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor2(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela2 / 0.0223 -
									saldoDevedor2
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela3}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela3(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor3}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor3(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								prefix='R$ '
								decimalScale={2}
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela3 / 0.0223 -
									saldoDevedor3
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela4}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela4(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor4}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor4(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela4 / 0.0223 -
									saldoDevedor4
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela5}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela5(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor5}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor5(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela5 / 0.0223 -
									saldoDevedor5
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela6}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela6(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor6}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor6(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela6 / 0.0223 -
									saldoDevedor6
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontSize={"14px"}
								mb={4}
								fontWeight={"bold"}
								mr={2}
							>
								PARCELA
							</Text>
							<NumericFormat
								value={parcela7}
								onValueChange={(values) => {
									const { floatValue } = values;
									setParcela7(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								SALDO DEVEDOR
							</Text>
							<NumericFormat
								value={saldoDevedor7}
								onValueChange={(values) => {
									const { floatValue } = values;
									setSaldoDevedor7(Number(floatValue));
								}}
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								prefix='R$ '
								fixedDecimalScale={true}
								customInput={Input}
							/>
						</Flex>
						<Flex>
							<Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
								{`POSSIBILIDADES: ${(
									parcela7 / 0.0223 -
									saldoDevedor7
								).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}`}
							</Text>
						</Flex>
					</SimpleGrid>
					{/* <div className="parcelasPossibilidades">
            {parcelas.map((parcela) => (
              <CalculatorInput
                key={parcela.label}
                label={parcela.label.split("-")[0]}
                onChange={(e) =>
                  handleSetParcelas(+e.target.value, parcela.index)
                }
              />
            ))}
          </div>
          <div className="saldoPossibilidades">
            {saldos.map((saldo) => (
              <CalculatorInput
                key={saldo.label}
                label={saldo.label.split("-")[0]}
                onChange={(e) => handleSetSaldos(+e.target.value, saldo.index)}
              />
            ))}
          </div>
          <div className="possibilidadesPossibilidades">
            {resultsPossibilidade.map(
              (result: { label: string; value: string }) => (
                <CalculatorResult result={result.label + result.value} />
              )
            )}
          </div> */}
				</section>
				<div className='resultadosPossibilidades'>
					<Text
						fontSize={"14px"}
						fontWeight={"medium"}
						mx={4}
					>{`TOTAL DAS PARCELAS: ${reducePArcelas.toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL",
						}
					)}`}</Text>
					<Text
						fontSize={"14px"}
						fontWeight={"medium"}
						mx={4}
					>{`TOTAL SALDO DEVEDOR: ${reduceSaldoDevedor.toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL",
						}
					)}`}</Text>
					<Text
						fontSize={"14px"}
						fontWeight={"medium"}
						mx={4}
					>{`VALOR LIQUÍDO APROXIMADO NA PORTABILIDADE: ${reduceSaldoLiquidoAproximado.toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL",
						}
					)}`}</Text>
				</div>
				<h3 id='obs'>
					OBSERVAÇÕES: Estes valores de portabilidade são valores
					aproximados para assertividade dos valores é preciso aguarda
					o retorno TOTAL da dívida junto ao banco e a possibilidade
					de conseguir seguir devído as regras de cada banco.
				</h3>
				<div id='trocoLiquidoDiv'>
					<Text
						fontSize={"14px"}
						fontWeight={"medium"}
						mx={4}
					>{`TROCO LIQUÍDO DA PORTABILIDADE (VALOR APROXIMADO): ${reduceSaldoLiquidoAproximado.toLocaleString(
						"pt-BR",
						{
							style: "currency",
							currency: "BRL",
						}
					)}`}</Text>
					<p>NÃO ALTERA O VALOR DAS PARCELAS</p>
				</div>
				<div className='totaisContainer'>
					<Text
						fontSize={"14px"}
						fontWeight={"bold"}
						mx={4}
					>{`TOTAL: ${totalValores.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text
						fontSize={"14px"}
						fontWeight={"bold"}
						mx={4}
					>{`PARCELA: ${totalparcelas.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`}</Text>
					<Text
						fontSize={"14px"}
						fontWeight={"bold"}
						mx={4}
					>{`84x`}</Text>
				</div>
			</div>
		</div>
	);
}
