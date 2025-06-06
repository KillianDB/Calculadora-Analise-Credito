import { useState } from "react";
import { CalculatorTitle } from "../../../CalculatorTitle";
import { formatNumber } from "../../../../utils/formatNumbers";
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
  const paramsString = localStorage.getItem("calculatorParams");
  if (!paramsString) return "no parameters found";

  const params = JSON.parse(paramsString);
  console.log("params at EXERCITO Possibilidades Gerais => ", params);
  const ExercitoValues =
    params?.EXERCITO?.["Possibilidades Gerais"]?.values || [];

  const [values, setValues] = useState([
    { label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
  ]);

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

  const trocoLiquidoPortabilidade = [
    parcela1,
    parcela2,
    parcela3,
    parcela4,
    parcela5,
    parcela6,
    parcela7,
  ].reduce((acc, parcela, index) => {
    const prazoRestante = eval(`prazoRestante${index + 1}`);
    const taxaJuros = eval(`taxaJuros${index + 1}`);

    const liquidoCliente =
      parcela /
        +ExercitoValues.find(
          (v: any) => v.key === "coeficiente_liquido_cliente"
        )?.value -
      (parcela / taxaJuros -
        parcela *
          (+ExercitoValues.find(
            (v: any) => v.key === "coeficiente_saldo_devedor"
          )?.value -
            prazoRestante) *
          +ExercitoValues.find(
            (v: any) => v.key === "porcentagem_saldo_devedor"
          )?.value);

    return liquidoCliente > 0 ? acc + liquidoCliente : acc;
  }, 0);

  const somaParcelasPositivas = [
    parcela1,
    parcela2,
    parcela3,
    parcela4,
    parcela5,
    parcela6,
    parcela7,
  ].reduce((acc, parcela, index) => {
    const prazoRestante = eval(`prazoRestante${index + 1}`);
    const taxaJuros = eval(`taxaJuros${index + 1}`);

    const liquidoCliente =
      parcela /
        +ExercitoValues.find(
          (v: any) => v.key === "coeficiente_liquido_cliente"
        )?.value -
      (parcela / taxaJuros -
        parcela *
          (+ExercitoValues.find(
            (v: any) => v.key === "coeficiente_saldo_devedor"
          )?.value -
            prazoRestante) *
          +ExercitoValues.find(
            (v: any) => v.key === "porcentagem_saldo_devedor"
          )?.value);

    return liquidoCliente > 0 ? acc + parcela : acc;
  }, 0);

  function handleInputValue(value: { label: string; value: string | number }) {
    if (value.value === 0) return;
    console.log("handleInputValue called with value => ", value);

    if (value.label === "VALOR MARGEM EMPRÉSTIMO: ") {
      setValues((prevState) => {
        prevState[0].value =
          typeof value === "number"
            ? value
            : parseFloat(value.value.toString());
        return [...prevState];
      });
    }

    const filled =
      values[0].value > 0 &&
      (trocoLiquidoPortabilidade > 0 || somaParcelasPositivas > 0);
    console.log("filled => ", filled);
    setAllInputsFilled(filled);

    if (filled) {
      const finalResult = [
        `Valor Empréstimo R$ ${formatNumber(
          values[0].value /
            +ExercitoValues.find((v: any) => v.key === "coeficiente_emprestimo")
              ?.value
        )}`,
        `Parcela Empréstimo R$ ${formatNumber(values[0].value)} 84x`,
        `Portabilidade Aprox. R$ ${formatNumber(trocoLiquidoPortabilidade)}`,
        `Parcela Portabilidade R$ ${formatNumber(somaParcelasPositivas)} 84x`,
        `VALOR TOTAL R$ ${formatNumber(
          values[0].value /
            +ExercitoValues.find((v: any) => v.key === "coeficiente_emprestimo")
              ?.value +
            trocoLiquidoPortabilidade
        )}`,
        `PARCELA TOTAL R$ ${formatNumber(
          values[0].value + somaParcelasPositivas
        )} 84x`,
      ];

      setFinalResult(finalResult);
    }
  }

  // useEffect(() => {
  //   const filled =
  //     values[0].value > 0 &&
  //     (trocoLiquidoPortabilidade > 0 || somaParcelasPositivas > 0);
  //   setAllInputsFilled(filled);

  //   if (filled) {
  //     const finalResult = [
  //       `Valor Empréstimo R$ ${formatNumber(
  //         values[0].value /
  //           +ExercitoValues.find((v: any) => v.key === "coeficiente_emprestimo")
  //             ?.value
  //       )}`,
  //       `Parcela Empréstimo R$ ${formatNumber(values[0].value)} 84x`,
  //       `Portabilidade Aprox. R$ ${formatNumber(trocoLiquidoPortabilidade)}`,
  //       `Parcela Portabilidade R$ ${formatNumber(somaParcelasPositivas)} 84x`,
  //       `VALOR TOTAL R$ ${formatNumber(
  //         values[0].value /
  //           +ExercitoValues.find((v: any) => v.key === "coeficiente_emprestimo")
  //             ?.value +
  //           trocoLiquidoPortabilidade
  //       )}`,
  //       `PARCELA TOTAL R$ ${formatNumber(
  //         values[0].value + somaParcelasPositivas
  //       )} 84x`,
  //     ];

  //     setFinalResult(finalResult);
  //   }
  // }, [
  //   values[0].value,
  //   trocoLiquidoPortabilidade,
  //   somaParcelasPositivas,
  //   setAllInputsFilled,
  // ]);

  return (
    <Flex
      className="calculatorComponentFlexPossibilidadesExercito"
      style={{ flexDirection: "column" }}
    >
      <Flex className="mainContainerPossibilidadesExercito">
        <CalculatorTitle menu="Exército" submenu="Possibilidades Gerais" />
        <Flex className="inputsContainerExercito">
          <FormControl>
            <FormLabel>{values[0].label}</FormLabel>
            <NumericFormat
              value={values[0].value}
              onValueChange={(v) => {
                const { floatValue } = v;
                handleInputValue({
                  label: values[0].label,
                  value: floatValue ?? 0,
                });
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              prefix="R$ "
              fixedDecimalScale={true}
              customInput={Input}
            />
          </FormControl>
        </Flex>
      </Flex>
      <Flex className="secondContainerPossibilidadesExercito">
        <Text className="h4CalculadoraDePortabilidadeRapida">
          Calculadora de Portabilidade Rápida
        </Text>
        <Flex className="mainSecondContainerPossibilidadesExercito">
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
                  handleInputValue({
                    label: "parcela1",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo1", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa1", value: floatValue ?? 0 });
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
                  ? // ? Math.max(
                    parcela1 / taxaJuros1 -
                    parcela1 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante1) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value
                  : // )
                    0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
            <Flex alignItems={"center"} height={"60px"}>
              <Text fontSize={"12px"} mb={4} fontWeight={"bold"}>
                {`LIQUIDO CLIENTE: ${(parcela1 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela1 / taxaJuros1 -
                    parcela1 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante1) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela1 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela1 / taxaJuros1 -
                      parcela1 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante1) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela2",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo2", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa2", value: floatValue ?? 0 });
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
                        parcela2 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante2) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela2 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela2 / taxaJuros2 -
                    parcela2 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante2) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela2 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela2 / taxaJuros2 -
                      parcela2 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante2) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela3",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo3", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa3", value: floatValue ?? 0 });
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
                        parcela3 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante3) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela3 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela3 / taxaJuros3 -
                    parcela3 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante3) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela3 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela3 / taxaJuros3 -
                      parcela3 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante3) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela4",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo4", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa4", value: floatValue ?? 0 });
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
                        parcela4 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante4) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela4 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela4 / taxaJuros4 -
                    parcela4 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante4) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela4 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela4 / taxaJuros4 -
                      parcela4 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante4) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela5",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo5", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa5", value: floatValue ?? 0 });
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
                        parcela5 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante5) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela5 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela5 / taxaJuros5 -
                    parcela5 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante5) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela5 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela5 / taxaJuros5 -
                      parcela5 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante5) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela6",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo6", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa6", value: floatValue ?? 0 });
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
                        parcela6 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante6) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela6 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela6 / taxaJuros6 -
                    parcela6 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante6) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela6 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela6 / taxaJuros6 -
                      parcela6 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante6) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
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
                  handleInputValue({
                    label: "parcela7",
                    value: floatValue ?? 0,
                  });
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
                  handleInputValue({ label: "prazo7", value: floatValue ?? 0 });
                }}
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
                  handleInputValue({ label: "taxa7", value: floatValue ?? 0 });
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
                        parcela7 *
                          (+ExercitoValues.find(
                            (v: any) => v.key === "coeficiente_saldo_devedor"
                          )?.value -
                            prazoRestante7) *
                          +ExercitoValues.find(
                            (v: any) => v.key === "porcentagem_saldo_devedor"
                          )?.value,
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
                {`LIQUIDO CLIENTE: ${(parcela7 /
                  +ExercitoValues.find(
                    (v: any) => v.key === "coeficiente_liquido_cliente"
                  )?.value -
                  (parcela7 / taxaJuros7 -
                    parcela7 *
                      (+ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_saldo_devedor"
                      )?.value -
                        prazoRestante7) *
                      +ExercitoValues.find(
                        (v: any) => v.key === "porcentagem_saldo_devedor"
                      )?.value) >
                0
                  ? parcela7 /
                      +ExercitoValues.find(
                        (v: any) => v.key === "coeficiente_liquido_cliente"
                      )?.value -
                    (parcela7 / taxaJuros7 -
                      parcela7 *
                        (+ExercitoValues.find(
                          (v: any) => v.key === "coeficiente_saldo_devedor"
                        )?.value -
                          prazoRestante7) *
                        +ExercitoValues.find(
                          (v: any) => v.key === "porcentagem_saldo_devedor"
                        )?.value)
                  : 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
          </SimpleGrid>
        </Flex>
        <Text className="obsExercito">
          OBS: Estes valores são valores aproximados. Para assertividade dos
          valores é preciso aguardar o retorno do total da dívida junto ao banco
          e a possibilidade de conseguir seguir devido as regras de cada banco.
        </Text>
        <Flex className="resultsContainerPossibilidadesExercito">
          <Text
            fontSize={"12px"}
            fontWeight={"medium"}
            mx={4}
          >{`VALOR EMPRÉSTIMO: ${(
            values[0].value /
            +ExercitoValues.find((v: any) => v.key === "coeficiente_emprestimo")
              ?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text
            fontSize={"12px"}
            fontWeight={"medium"}
            mx={4}
          >{`PARCELA: ${values[0].value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text
            fontSize={"12px"}
            fontWeight={"medium"}
            mx={4}
          >{`TROCO LIQUÍDO DA PORTABILIDADE: ${trocoLiquidoPortabilidade.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}`}</Text>
          <Text
            fontSize={"12px"}
            fontWeight={"medium"}
            mx={4}
          >{`PARCELA: ${somaParcelasPositivas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
        </Flex>
        <Flex className="totaisContainer">
          <Text fontSize={"14px"} fontWeight={"bold"} mx={4}>{`TOTAL: ${(
            trocoLiquidoPortabilidade +
            values[0].value /
              +ExercitoValues.find(
                (v: any) => v.key === "coeficiente_emprestimo"
              )?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"} fontWeight={"bold"} mx={4}>{`PARCELA: ${(
            values[0].value + somaParcelasPositivas
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"} fontWeight={"bold"} mx={4}>{`84x`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
