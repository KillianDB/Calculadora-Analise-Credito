import { useState, useEffect } from "react";
import { calculate } from "../../../../utils/calculate";
import { CalculatorResult } from "../../../CalculatorResult";
import { CalculatorTitle } from "../../../CalculatorTitle";
import CalculatorTotal from "../../../CalculatorTotal";
import { formatNumber } from "../../../../utils/formatNumbers";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import "./inss-calculo-por-margem-disponivel.css";

export function CalculatorINSS1({
  setAllInputsFilled,
  setFinalResult,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}) {
  const [results, setResults] = useState([
    "VALOR EMPRÉSTIMO: R$00000,00",
    "PARCELA R$ 0000,00",
    "VALOR CARTÃO INSS: R$ 000,00",
    "PARCELA R$ 0000,00",
    "VALOR CARTÃO ENVIADO: R$ 000,00",
    "PARCELA R$ 0000,00",
    "VALOR CARTÃO BENEFÍCIO: R$ 000,00",
    "PARCELA R$ 0000,00",
    "VALOR CARTÃO ENVIADO: R$ 000,00",
    "PARCELA R$ 0000,00",
  ]);
  const [totais, setTotal] = useState([
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "84x",
  ]);
  const [values, setValues] = useState([
    { label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0, index: 0 },
    { label: "VALOR MARGEM CARTÃO INSS: ", value: 0, index: 1 },
    { label: "VALOR MARGEM CARTÃO BENEFÍCIO: ", value: 0, index: 2 },
  ]);

  useEffect(() => {
    const allFilled = values.every((item) => item.value !== 0);
    setAllInputsFilled(allFilled);
  }, [values]);

  useEffect(() => {
    handleInputValue(values[0].label, values[0].value);
  }, [values[0].value]);

  function handleInputValue(label: string, value: number) {
    if (value === 0) return;
    const updatedValues = values.map((item) =>
      item.label === label ? { ...item, value } : item
    );
    setValues(updatedValues);

    const result = calculate(
      "INSS",
      "Cálculo por Margem Disponível",
      updatedValues
    );

    if (Array.isArray(result) && result.length > 0) {
      setResults(result.slice(0, 10));
      setTotal(result.slice(10, 13));
      const finalResult = [
        `Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
        `Parcela Empréstimo R$ ${result[1].split(" R$ ")[1]} 84x`,
        `Valor Cartão R$ ${result[13]}`,
        `Parcela Cartão R$ ${formatNumber(
          parseFloat(result[3].split(" R$ ")[1]) +
            parseFloat(result[7].split(" R$ ")[1])
        )} 84x`,
        `Valor Cartão Enviado R$ ${formatNumber(
          parseFloat(result[4].split(" R$ ")[1]) +
            parseFloat(result[8].split(" R$ ")[1])
        )}`,
        `Parcela Cartão Enviado R$ ${formatNumber(
          parseFloat(result[5].split(" R$ ")[1]) +
            parseFloat(result[9].split(" R$ ")[1])
        )} 84x`,
        `VALOR TOTAL R$ ${result[10].split(" R$ ")[1]}`,
        `PARCELA TOTAL R$ ${result[11].split(" R$ ")[1]} 84x`,
      ];
      setFinalResult(finalResult);
    }
  }

  return (
    <Flex className="calculatorComponentDiv" style={{ height: "75vh" }}>
      <CalculatorTitle menu="INSS" submenu="Cálculo por Margem Disponível" />
      <Flex className="inputsContainer" style={{ height: "280px" }}>
        {values.map((value) => (
          <FormControl>
            <FormLabel>{value.label}</FormLabel>
            <InputGroup>
              <NumericFormat
                value={value.value}
                onValueChange={(number) => {
                  const { floatValue } = number;
                  handleInputValue(value.label, floatValue ?? 0);
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
        ))}
      </Flex>
      <Flex className="answerContainer" style={{ height: "31vh" }}>
        <Flex
          className="resultsContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "200px",
            rowGap: "14px",
            height: "fit-content",
            padding: "12px 0",
          }}
        >
          {results.map((result: string, index) => (
            <CalculatorResult key={index} result={result} />
          ))}
        </Flex>
        <Flex className="totaisContainer">
          {totais.map((total) => (
            <CalculatorTotal total={total} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
