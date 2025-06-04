import { useEffect, useState } from "react";
import { CalculatorTitle } from "../../../CalculatorTitle";
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
import { calculate } from "../../../../utils/calculate";

export function CalculatorINSS5({
  setAllInputsFilled,
  setFinalResult,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}) {
  const paramsString = localStorage.getItem("calculatorParams");
  if (!paramsString) return "no parameters found";

  const params = JSON.parse(paramsString);
  console.log("params at INSS Possibilidades Gerais => ", params);
  const INSSValues = params?.INSS?.["Possibilidades Gerais"]?.values || [];
  let coeficienteEmprestimo = +INSSValues.find(
    (v: any) => v.key === "coeficiente_emprestimo"
  )?.value;
  let coeficienteCartaoINSS = +INSSValues.find(
    (v: any) => v.key === "coeficiente_cartao_inss"
  )?.value;
  let coeficienteCartaoBeneficio = +INSSValues.find(
    (v: any) => v.key === "coeficiente_cartao_beneficio"
  )?.value;
  let porcentagemCompras = +INSSValues.find(
    (v: any) => v.key === "porcentagem_compras"
  )?.value;
  let porcentagemMargemCartaoINSS = +INSSValues.find(
    (v: any) => v.key === "porcentagem_margem_cartao_inss"
  )?.value;
  let porcentagemMargemCartaoBeneficio = +INSSValues.find(
    (v: any) => v.key === "porcentagem_margem_cartao_beneficio"
  )?.value;

  const [, setValues] = useState([
    { label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
    { label: "VALOR MARGEM CARTÃO INSS: ", value: 0 },
    {
      label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
      value: 0,
    },
  ]);
  const [margemEmprestimo, setMargememprestimo] = useState(0);
  const [margemCartaoInss, setMargemcartaoInss] = useState(0);
  const [margemCartaoBeneficio, setMargemcartaoBeneficio] = useState(0);

  const totalValores =
    margemEmprestimo /
      INSSValues.find((v: any) => v.key === "coeficiente_emprestimo")?.value +
    margemCartaoInss *
      INSSValues.find((v: any) => v.key === "coeficiente_cartao_inss")?.value +
    margemCartaoInss *
      INSSValues.find((v: any) => v.key === "coeficiente_cartao_inss")?.value *
      INSSValues.find((v: any) => v.key === "porcentagem_cartao_inss")?.value +
    margemCartaoBeneficio * +coeficienteCartaoBeneficio +
    margemCartaoBeneficio *
      INSSValues.find((v: any) => v.key === "porcentagem_cartao_beneficio")
        ?.value;

  const totalparcelas =
    margemEmprestimo +
    margemCartaoInss * +porcentagemMargemCartaoINSS +
    margemCartaoInss *
      INSSValues.find(
        (v: any) => v.key === "porcentagem_compras_margem_cartao_inss"
      )?.value +
    margemCartaoBeneficio * +porcentagemMargemCartaoBeneficio +
    margemCartaoBeneficio *
      INSSValues.find(
        (v: any) => v.key === "porcentagem_compras_margem_cartao_beneficio"
      )?.value;

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
      parcela /
        INSSValues.find((v: any) => v.key === "coeficiente_possibilidade")
          ?.value -
      eval(`saldoDevedor${index + 1}`);
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
      eval(`parcela${index + 1}`) /
        INSSValues.find((v: any) => v.key === "coeficiente_possibilidade")
          ?.value -
      saldoDevedor;
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
      parcela /
        INSSValues.find((v: any) => v.key === "coeficiente_possibilidade")
          ?.value -
      eval(`saldoDevedor${index + 1}`);
    return possibilidade >= 0 ? acc + possibilidade : acc;
  }, 0);

  useEffect(() => {
    const mainValuesFilled = [
      margemEmprestimo,
      margemCartaoInss,
      margemCartaoBeneficio,
    ].every((item) => item !== 0);

    const hasValidPair = [
      { parcela: parcela1, saldo: saldoDevedor1 },
      { parcela: parcela2, saldo: saldoDevedor2 },
      { parcela: parcela3, saldo: saldoDevedor3 },
      { parcela: parcela4, saldo: saldoDevedor4 },
      { parcela: parcela5, saldo: saldoDevedor5 },
      { parcela: parcela6, saldo: saldoDevedor6 },
      { parcela: parcela7, saldo: saldoDevedor7 },
    ].some((pair) => pair.parcela !== 0 && pair.saldo !== 0);

    setAllInputsFilled(mainValuesFilled && hasValidPair);

    setValues([
      { label: "VALOR MARGEM EMPRÉSTIMO: ", value: margemEmprestimo },
      { label: "VALOR MARGEM CARTÃO INSS: ", value: margemCartaoInss },
      {
        label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
        value: margemCartaoBeneficio,
      },
    ]);
  }, [
    margemEmprestimo,
    margemCartaoInss,
    margemCartaoBeneficio,
    parcela1,
    saldoDevedor1,
    parcela2,
    saldoDevedor2,
    parcela3,
    saldoDevedor3,
    parcela4,
    saldoDevedor4,
    parcela5,
    saldoDevedor5,
    parcela6,
    saldoDevedor6,
    parcela7,
    saldoDevedor7,
  ]);

  useEffect(() => {
    const result = calculate("INSS", "Possibilidades Gerais", [
      { label: "VALOR MARGEM EMPRÉSTIMO: ", value: margemEmprestimo },
      { label: "VALOR MARGEM CARTÃO INSS: ", value: margemCartaoInss },
      {
        label: "VALOR MARGEM CARTÃO BENEFÍCIO: ",
        value: margemCartaoBeneficio,
      },
      {
        label: "VALOR LIQUIDO APROXIMADO NA PORTABILIDADE: ",
        value: reduceSaldoLiquidoAproximado,
      },
      { label: "TOTAL PARCELAS: ", value: reducePArcelas },
      { label: "TOTAL SALDO DEVEDOR: ", value: reduceSaldoDevedor },
    ]);

    if (result !== "no valid labels" && result?.length) {
      const getValue = (str: string) => str.split("R$ ")[1]?.trim() || "0,00";
      console.log("total carão on INSS => ", result[22]);
      const finalResult = [
        `Valor Empréstimo R$ ${getValue(result[0])}`,
        `Valor Parcela R$ ${getValue(result[1])} 84x`,
        `Valor Cartão R$ ${result[22]}`,
        `Parcela Cartão R$ ${result[23]} 84x`,
        `Valor Compras R$ ${result[24]}`,
        `Parcela Compras R$ ${result[25]} 84x`,
        `Portabilidade Aprox. R$ ${getValue(result[17])}`,
        "Portando as parcelas R$ Não alteram",
        `VALOR TOTAL R$ ${getValue(result[19])}`,
        `PARCELA TOTAL R$ ${getValue(result[20])} 84x`,
      ];
      console.log("finalResult => ", finalResult);
      setFinalResult(finalResult);
    }
  }, [
    margemEmprestimo,
    margemCartaoInss,
    margemCartaoBeneficio,
    reduceSaldoLiquidoAproximado,
    reducePArcelas,
    reduceSaldoDevedor,
  ]);

  return (
    <div className="calculatorComponentDivPossibilidades">
      <Flex
        flexDir={"column"}
        shadow={"md"}
        dropShadow={"2xl"}
        boxShadow={"lg"}
        alignItems={"center"}
        p={3}
      >
        <CalculatorTitle menu="INSS" submenu="Possibilidades Gerais" />
        <Flex w={"25vw"} mt={2} flexDir={"column"} alignItems={"center"}>
          <FormControl>
            <FormLabel>VALOR MARGEM EMPRÉSTIMO: </FormLabel>
            <InputGroup>
              <NumericFormat
                value={margemEmprestimo}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setMargememprestimo(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
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
                thousandSeparator="."
                decimalSeparator=","
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
                  setMargemcartaoBeneficio(Number(floatValue));
                }}
                thousandSeparator="."
                decimalSeparator=","
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
            margemEmprestimo /
            +INSSValues.find((v: any) => v.key === "coeficiente_emprestimo")
              ?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`PARCELA: ${margemEmprestimo.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}`}</Text>
          <Text fontSize={"14px"}>{`84x`}</Text>
          <Text fontSize={"14px"}>{`CARTÃO INSS: ${(
            margemCartaoInss * coeficienteCartaoINSS
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`PARCELA:${(
            margemCartaoInss * porcentagemMargemCartaoINSS
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`84x`}</Text>
          <Text fontSize={"14px"}>{`VALOR COMPRAS: ${(
            margemCartaoInss *
            +coeficienteCartaoINSS *
            +INSSValues.find((v: any) => v.key === "porcentagem_cartao_inss")
              ?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`PARCELA: ${(
            margemCartaoInss *
            +INSSValues.find(
              (v: any) => v.key === "porcentagem_compras_margem_cartao_inss"
            )?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`84x`}</Text>
          <Text fontSize={"14px"}>{`CARTÃO BENEFÍCIO: ${(
            margemCartaoBeneficio * +coeficienteCartaoBeneficio
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`PARCELA: ${(
            margemCartaoBeneficio * +porcentagemMargemCartaoBeneficio
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`84x`}</Text>
          <Text fontSize={"14px"}>{`VALOR COMPRAS: ${(
            margemCartaoBeneficio *
            +INSSValues.find(
              (v: any) => v.key === "porcentagem_cartao_beneficio"
            )?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`PARCELA: ${(
            margemCartaoBeneficio *
            +INSSValues.find(
              (v: any) =>
                v.key === "porcentagem_compras_margem_cartao_beneficio"
            )?.value
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text fontSize={"14px"}>{`84x`}</Text>
        </SimpleGrid>
      </Flex>
      <div className="secondContainerPossibilidades">
        <h3>NÃO PORTAMOS OS BANCO FACTA 935 - BANCO SEGURO 081 E BRB</h3>
        <h4>Calculadora de Portabilidade</h4>
        <section className="mainSecondContainerPossibilidades">
          <SimpleGrid
            columns={3}
            spacingX={8}
            spacingY={2}
            w={"80%"}
            mt={2}
            mx={"auto"}
          >
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix="R$ "
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela1 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor1
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                fixedDecimalScale={true}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela2 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor2
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela3 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor3
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela4 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor4
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela5 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor5
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela6 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor6
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>

            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"} mr={2}>
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
                decimalScale={2}
                prefix="R$ "
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
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale={true}
                customInput={Input}
              />
            </Flex>
            <Flex>
              <Text fontSize={"14px"} mb={4} fontWeight={"bold"}>
                {`POSSIBILIDADES: ${(
                  parcela7 /
                    +INSSValues.find(
                      (v: any) => v.key === "coeficiente_possibilidade"
                    )?.value -
                  saldoDevedor7
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
              </Text>
            </Flex>
          </SimpleGrid>
        </section>
        <div className="resultadosPossibilidades">
          <Text
            fontSize={"14px"}
            fontWeight={"medium"}
            mx={4}
          >{`TOTAL DAS PARCELAS: ${reducePArcelas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
          <Text
            fontSize={"14px"}
            fontWeight={"medium"}
            mx={4}
          >{`TOTAL SALDO DEVEDOR: ${reduceSaldoDevedor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</Text>
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
        <h3 id="obs">
          OBSERVAÇÕES: Estes valores de portabilidade são valores aproximados
          para assertividade dos valores é preciso aguarda o retorno TOTAL da
          dívida junto ao banco e a possibilidade de conseguir seguir devído as
          regras de cada banco.
        </h3>
        <div id="trocoLiquidoDiv">
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
        <div className="totaisContainer">
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
          <Text fontSize={"14px"} fontWeight={"bold"} mx={4}>{`84x`}</Text>
        </div>
      </div>
    </div>
  );
}
