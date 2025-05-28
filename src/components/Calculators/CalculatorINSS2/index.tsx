import { Key, useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import "./calculatorINSS2.css";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export function CalculatorINSS2({
  setAllInputsFilled,
  setFinalResult,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}) {
  const [values, setValues] = useState([
    { label: "VALOR DE EMPRÉSTIMO SOLICITADO: ", value: 0 },
  ]);
  const [totais, setTotais] = useState([
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "84x",
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "72x",
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "60x",
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "48x",
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "36x",
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "24x",
  ]);

  function handleInputValue(label: string, value: number) {
    if (value === 0) return;
    setValues([{ label, value }]);
    const result = calculate("INSS", "Cálculo Valor Solicitado", [
      { label, value },
    ]);

    if (Array.isArray(result) && result.length > 0) {
      setTotais(result);

      const finalResult: string[] = [
        `Valor Empréstimo Solicitado R$ ${result[0].split(" R$ ")[1]}`,
        `Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
        `Parcela R$ ${result[4].split(" R$ ")[1]} 72x`,
        `Parcela R$ ${result[7].split(" R$ ")[1]} 60x`,
        `Parcela R$ ${result[10].split(" R$ ")[1]} 48x`,
        `Parcela R$ ${result[13].split(" R$ ")[1]} 36x`,
        `Parcela R$ ${result[16].split(" R$ ")[1]} 24x`,
        `VALOR TOTAL R$ ${result[0].split(" R$ ")[1]}`,
        `Parcela Total R$ ${result[1].split(" R$ ")[1]} 84x`,
      ];

      console.log("Final result:", finalResult);
      setFinalResult(finalResult);
    }
  }

  function chunkArray(array: string[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  useEffect(() => {
    const allFilled = values.every((item) => item.value !== 0);
    setAllInputsFilled(allFilled);
  }, [values]);

  useEffect(() => {
    handleInputValue(values[0].label, values[0].value);
  }, [values[0].value]);

  const chunkedTotais = chunkArray(totais, 3);

  return (
    <Flex className="calculatorComponentDiv" id="calculatorComponentDivTwo">
      <CalculatorTitle menu="INSS" submenu="Cálculo Valor Solicitado" />
      <Flex className="inputsContainer">
        <FormControl>
          <FormLabel>{values[0].label}</FormLabel>
          <InputGroup>
            <NumericFormat
              value={values[0].value}
              onValueChange={(values) => {
                const { floatValue } = values;
                setValues([
                  {
                    label: "VALOR DE EMPRÉSTIMO SOLICITADO: ",
                    value: Number(floatValue),
                  },
                ]);
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
      <Flex className="answerContainer" id="answerContainerTwo">
        {chunkedTotais.map((chunk, index) => (
          <Flex
            key={index}
            className="totaisContainer"
            id="totaisContainerINSS2"
          >
            {chunk.map((total: string, subIndex: Key | null | undefined) => (
              <CalculatorTotal key={subIndex} total={total} />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
