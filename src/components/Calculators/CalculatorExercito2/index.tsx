/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
// import { calculate } from "../../../utils/calculate";
import CalculatorInput from "../../CalculatorInput";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import { formatNumber } from "../../../utils/formatNumbers";
import "./exercito.css";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export function CalculatorExercito2({
  setAllInputsFilled,
  setFinalResult,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}) {
  const [somaLiquidosArray, setSomaLiquidosArray] = useState<
    { index: number; value: number }[]
  >([]);
  let somaLiquidos = 0;
  let somaParcelas = 0;

  const [indexCalc, setIndexCalc] = useState(0);
  const [results, setResults] = useState([
    //input 1/0.02385
    { label: "VALOR EMPRESTIMO: R$ ", value: "000,00" },
    //valor input 1
    { label: "PARCELA: R$ ", value: "000,00" },
    //soma do liquido cliente positivo
    { label: "TROCO LÍQUIDO PORTABILIDADE: R$ ", value: "000,00" },
    //total parcelas positivo
    { label: "PARCELA: R$ ", value: "000,00" },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resultsPossibilidade, setResultsPossibilidade] = useState([
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "SALDO DEVEDOR", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
    { label: "LÍQUIDO CLIENTE", value: " R$ 000,00" },
  ]);
  const [total, setTotal] = useState([
    "TOTAL R$ 00.000,00",
    "PARCELA - R$ 000,00",
    "72x",
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [parcelas, setParcelas] = useState([
    { label: "PARCELA-0", value: 0, index: 0 },
    { label: "PARCELA-1", value: 0, index: 1 },
    { label: "PARCELA-2", value: 0, index: 2 },
    { label: "PARCELA-3", value: 0, index: 3 },
    { label: "PARCELA-4", value: 0, index: 4 },
    { label: "PARCELA-5", value: 0, index: 5 },
    { label: "PARCELA-6", value: 0, index: 6 },
  ]);

  const [prazos, setPrazos] = useState([
    { label: "PRAZO RESTANTE-0", value: 0, index: 0 },
    { label: "PRAZO RESTANTE-1", value: 0, index: 1 },
    { label: "PRAZO RESTANTE-2", value: 0, index: 2 },
    { label: "PRAZO RESTANTE-3", value: 0, index: 3 },
    { label: "PRAZO RESTANTE-4", value: 0, index: 4 },
    { label: "PRAZO RESTANTE-5", value: 0, index: 5 },
    { label: "PRAZO RESTANTE-6", value: 0, index: 6 },
  ]);

  const [taxas, setTaxas] = useState([
    { label: "TAXA DE JUROS-0", value: 0, index: 0 },
    { label: "TAXA DE JUROS-1", value: 0, index: 1 },
    { label: "TAXA DE JUROS-2", value: 0, index: 2 },
    { label: "TAXA DE JUROS-3", value: 0, index: 3 },
    { label: "TAXA DE JUROS-4", value: 0, index: 4 },
    { label: "TAXA DE JUROS-5", value: 0, index: 5 },
    { label: "TAXA DE JUROS-6", value: 0, index: 6 },
  ]);
  const [values, setValues] = useState([
    { label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
  ]);

  useEffect(() => {
    handleSetParcelas(0, 1);
    handleSetTaxas(0, 1);
    handleSetPrazos(1, 1);
  }, []);

  useEffect(() => {
    const allFilled = values.slice(0, 3).every((item) => item.value !== 0);
    setAllInputsFilled(allFilled);
  }, [values, setAllInputsFilled]);

  useEffect(() => {
    console.log(prazos);
    if (prazos[0].value !== 0 && taxas[0].value !== 0) {
      if (parcelas[0].value !== 0) {
        console.log(prazos, parcelas, taxas);
        handleCalcular(prazos, parcelas, taxas, indexCalc);
      }
    }
  }, [parcelas, prazos, taxas, indexCalc]);

  const handleSetParcelas = (value: number, index: number) => {
    setIndexCalc(index);
    setParcelas((prevState) => {
      const newState = [...prevState];
      newState[index].value =
        typeof value === "string" ? parseFloat(value) : value;
      return newState;
    });
  };
  const handleSetPrazos = (value: number, index: number) => {
    setIndexCalc(index);
    setPrazos((prevState) => {
      const newState = [...prevState];
      newState[index].value =
        typeof value === "string" ? parseFloat(value) : value;
      return newState;
    });
  };
  const handleSetTaxas = (value: number, index: number) => {
    setIndexCalc(index);
    setTaxas((prevState) => {
      const newState = [...prevState];
      newState[index].value =
        typeof value === "string" ? parseFloat(value) : value;
      return newState;
    });
  };

  function handleCalcular(
    prazos: { label: string; value: number; index: number }[],
    parcelas: { label: string; value: number; index: number }[],
    taxas: { label: string; value: number; index: number }[],
    index: number
  ) {
    const prazos1 = prazos[index].value;
    const parcelas1 = parcelas[index].value;
    const taxas1 = taxas[index].value;

    const saldoDevedor =
      parcelas1 / (taxas1 / 100) - parcelas1 * (84 - prazos1) * 0.45;
    const liquidoCliente = parcelas1 / 0.0222 - saldoDevedor;
    console.log(`Saldo do clinete ${liquidoCliente}`);
    console.log(`Saldo do devedor ${saldoDevedor}`);
    setResultsPossibilidade((prevState) => {
      const newState = [...prevState];
      newState[index].value = ` R$ ${formatNumber(saldoDevedor)}`;
      newState[index + 7].value = ` R$ ${formatNumber(liquidoCliente)}`;
      return newState;
    });
    console.log(saldoDevedor, liquidoCliente);
    return [saldoDevedor, liquidoCliente];
  }

  function handleInputValue(label: string, value: number | string) {
    const index = parseInt(label.split("-")[1]) - 1;

    if (
      parcelas[index].value !== 0 &&
      prazos[index].value !== 0 &&
      taxas[index].value !== 0
    ) {
      //parcela/taxa de juros - (parcela*(84-prazo)*45%)

      const saldoDevedor =
        parcelas[index].value / (taxas[index].value / 100) -
        parcelas[index].value * (84 - prazos[index].value) * 0.45;
      const liquidoCliente = parcelas[index].value / 0.0222 - saldoDevedor;

      setResultsPossibilidade((prevState) => {
        const newState = [...prevState];
        newState[index].value = ` R$ ${formatNumber(saldoDevedor)}`;
        newState[index + 7].value = ` R$ ${formatNumber(liquidoCliente)}`;
        return newState;
      });
      if (liquidoCliente > 0) {
        setSomaLiquidosArray((prevState) => {
          const newState = [...prevState];
          newState[index] = {
            index,
            value:
              (typeof value === "number"
                ? value
                : parseFloat(value.toString())) + liquidoCliente,
          };
          return newState;
        });
        somaParcelas += parcelas[index].value;
        somaLiquidos = somaLiquidosArray.reduce(
          (acc, curr) => acc + curr.value,
          0
        );
        console.log("somaLiquidos antes de set", somaLiquidos);
        setResults((prevState) => {
          prevState[2].value = formatNumber(somaLiquidos);
          // / 0.0222
          // );
          return [...prevState];
        });
        console.log("somaParcelas antes de set", somaParcelas);
        setResults((prevState) => {
          const newState = [...prevState];
          newState[3].value = formatNumber(
            typeof somaParcelas === "number"
              ? somaParcelas
              : parseFloat(somaParcelas)
          );
          return newState;
        });
      }
    } else {
      console.log("ta no else do handleInputValue");
      console.log("label", label);
      console.log("value", value);
      setValues((prevState) => {
        prevState[0].value =
          typeof value === "number" ? value : parseFloat(value.toString());
        return [...prevState];
      });
      setResults((prevState) => {
        prevState[0].value = formatNumber(
          (typeof value === "number" ? value : parseFloat(value.toString())) /
            0.02385
        );
        return [...prevState];
      });
      setResults((prevState) => {
        prevState[1].value = formatNumber(
          typeof value === "number" ? value : parseFloat(value.toString())
        );
        return [...prevState];
      });
      setTotal((prevState) => {
        prevState[0] = `TOTAL R$ ${results[0].value}`;
        return [...prevState];
      });
      setTotal((prevState) => {
        prevState[1] = `PARCELA - R$ ${results[1].value}`;
        return [...prevState];
      });
    }
    const finalResult = [
      "Bem vindo, Cliente CR",
      `Valor Empréstimo R$ ${results[0].value}`,
      `Parcela Empréstimo R$ ${results[1].value} 84x`,
      `Portabilidade Aprox. R$ ${results[2].value}`,
      `Parcela Portabilidade R$ ${results[3].value} 84x`,
      `${total[0].split(" R$ ")[1]}`,
      `${total[1].split(" R$ ")[1]} 84x`,
    ];
    setFinalResult(finalResult);
    console.log("finalResult on exercito", finalResult);
  }

  const [valorMargememprestimo, setValorMargememprestimo] = useState(0);

  const [parcela1, setParcela1] = useState(0);
  const [parcela2, setParcela2] = useState(0);
  const [parcela3, setParcela3] = useState(0);
  const [parcela4, setParcela4] = useState(0);
  const [parcela5, setParcela5] = useState(0);
  const [parcela6, setParcela6] = useState(0);
  const [parcela7, setParcela7] = useState(0);

  const [prazoRestante1, setPrazoRestante1] = useState(0);
  const [prazoRestante2, setPrazoRestante2] = useState(0);
  const [prazoRestante3, setPrazoRestante3] = useState(0);
  const [prazoRestante4, setPrazoRestante4] = useState(0);
  const [prazoRestante5, setPrazoRestante5] = useState(0);
  const [prazoRestante6, setPrazoRestante6] = useState(0);
  const [prazoRestante7, setPrazoRestante7] = useState(0);

  const [taxaJuros1, setTaxaJuros1] = useState(0);
  const [taxaJuros2, setTaxaJuros2] = useState(0);
  const [taxaJuros3, setTaxaJuros3] = useState(0);
  const [taxaJuros4, setTaxaJuros4] = useState(0);
  const [taxaJuros5, setTaxaJuros5] = useState(0);
  const [taxaJuros6, setTaxaJuros6] = useState(0);
  const [taxaJuros7, setTaxaJuros7] = useState(0);

  return (
    <div className="calculatorComponentDivPossibilidadesExercito">
      <section className="mainContainerPossibilidadesExercito">
        <CalculatorTitle menu="Exército" submenu="Possibilidades Gerais" />
        <div className="inputsContainerExercito">
          <FormControl>
            <FormLabel>VALOR MARGEM EMPRÉSTIMO</FormLabel>
            <NumericFormat
              value={valorMargememprestimo}
              onValueChange={(values) => {
                const { floatValue } = values;
                setValorMargememprestimo(Number(floatValue));
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              customInput={Input}
            />
          </FormControl>
        </div>
      </section>
      <div className="secondContainerPossibilidadesExercito">
        <h4 className="h4CalculadoraDePortabilidadeRapida">
          Calculadora de Portabilidade Rápida
        </h4>
        <section className="mainSecondContainerPossibilidadesExercito">
          <SimpleGrid
            templateColumns="repeat(5, 1fr)"
            columns={5}
            spacingX={10}
            spacingY={2}
            w={"80vw"}
            mt={2}
            mx={"auto"}
          >
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela1}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela1(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante1}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante1(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix="R$ "
                customInput={Input}
              />
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros1}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros1(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                suffix=" %"
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros1 > 0
                  ? Math.max(
                      parcela1 / taxaJuros1 -
                        parcela1 * (84 - prazoRestante1) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela1 / 0.0222 -
                  (parcela1 / taxaJuros1 -
                    parcela1 * (84 - prazoRestante1) * 0.45) >
                0
                  ? parcela1 / 0.0222 -
                    (parcela1 / taxaJuros1 -
                      parcela1 * (84 - prazoRestante1) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela2}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela2(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante2}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante2(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros2}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros2(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros2 > 0
                  ? Math.max(
                      parcela2 / taxaJuros2 -
                        parcela2 * (84 - prazoRestante2) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela2 / 0.0222 -
                  (parcela2 / taxaJuros2 -
                    parcela2 * (84 - prazoRestante2) * 0.45) >
                0
                  ? parcela2 / 0.0222 -
                    (parcela2 / taxaJuros2 -
                      parcela2 * (84 - prazoRestante2) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela3}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela3(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante3}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante3(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros3}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros3(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros3 > 0
                  ? Math.max(
                      parcela3 / taxaJuros3 -
                        parcela3 * (84 - prazoRestante3) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela3 / 0.0222 -
                  (parcela3 / taxaJuros3 -
                    parcela3 * (84 - prazoRestante3) * 0.45) >
                0
                  ? parcela3 / 0.0222 -
                    (parcela3 / taxaJuros3 -
                      parcela3 * (84 - prazoRestante3) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela4}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela4(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante4}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante4(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros4}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros4(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros4 > 0
                  ? Math.max(
                      parcela4 / taxaJuros4 -
                        parcela4 * (84 - prazoRestante4) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela4 / 0.0222 -
                  (parcela4 / taxaJuros4 -
                    parcela4 * (84 - prazoRestante4) * 0.45) >
                0
                  ? parcela4 / 0.0222 -
                    (parcela4 / taxaJuros4 -
                      parcela4 * (84 - prazoRestante4) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela5}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela5(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante5}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante5(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros5}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros5(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros5 > 0
                  ? Math.max(
                      parcela5 / taxaJuros5 -
                        parcela5 * (84 - prazoRestante5) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela5 / 0.0222 -
                  (parcela5 / taxaJuros5 -
                    parcela5 * (84 - prazoRestante5) * 0.45) >
                0
                  ? parcela5 / 0.0222 -
                    (parcela5 / taxaJuros5 -
                      parcela5 * (84 - prazoRestante5) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela6}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela6(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante6}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante6(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros6}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros6(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros6 > 0
                  ? Math.max(
                      parcela6 / taxaJuros6 -
                        parcela6 * (84 - prazoRestante6) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela6 / 0.0222 -
                  (parcela6 / taxaJuros6 -
                    parcela6 * (84 - prazoRestante6) * 0.45) >
                0
                  ? parcela6 / 0.0222 -
                    (parcela6 / taxaJuros6 -
                      parcela6 * (84 - prazoRestante6) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"} mr={2}>
                PARCELA
              </Text>
              <NumericFormat
                value={parcela7}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setParcela7(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                PRAZO RESTANTE
              </Text>
              <NumericFormat
                value={prazoRestante7}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setPrazoRestante7(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                TAXA DE JUROS
              </Text>
              <NumericFormat
                value={taxaJuros7}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setTaxaJuros7(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                suffix=" %"
                customInput={Input}
              />
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`SALDO DEVEDOR: ${(taxaJuros7 > 0
                  ? Math.max(
                      parcela7 / taxaJuros7 -
                        parcela7 * (84 - prazoRestante7) * 0.45,
                      0
                    )
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela7 / 0.0222 -
                  (parcela7 / taxaJuros7 -
                    parcela7 * (84 - prazoRestante7) * 0.45) >
                0
                  ? parcela7 / 0.0222 -
                    (parcela7 / taxaJuros7 -
                      parcela7 * (84 - prazoRestante7) * 0.45)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
          </SimpleGrid>
        </section>
        <h3 className="obsExercito">
          OBS: Estes valores são valores aproximados. Para assertividade dos
          valores é preciso aguardar o retorno do total da dívida junto ao banco
          e a possibilidade de conseguir seguir devido as regras de cada banco.
        </h3>
        <div className="resultsContainerPossibilidadesExercito">
          {results.map((result) => (
            <CalculatorResult result={result.label + result.value} />
          ))}
        </div>
        <div className="totaisContainer">
          {total.map((t) => (
            <CalculatorTotal total={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
