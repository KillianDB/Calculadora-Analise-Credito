import { useEffect, useState } from "react";
import { calculate } from "../../../utils/calculate";
import { CalculatorResult } from "../../CalculatorResult";
import { CalculatorTitle } from "../../CalculatorTitle";
import CalculatorTotal from "../../CalculatorTotal";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

interface CalculatorExercito1Props {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}

export function CalculatorExercito1({
  setAllInputsFilled,
  setFinalResult,
}: CalculatorExercito1Props) {
  const [values, setValues] = useState([
    { label: "VALOR MARGEM EMPRÉSTIMO: ", value: 0 },
  ]);
  const [results, setResults] = useState([
    "VALOR EMPRÉSTIMO: R$00000,00",
    "PARCELA: R$00000,00",
  ]);
  const [totais, setTotal] = useState([
    "TOTAL: R$ 0,00",
    "PARCELA: R$ 0,00",
    "84x",
  ]);
  function handleInputValue(label: string, value: number) {
    if (value === 0) return;
    setValues([{ label, value }]);
    setAllInputsFilled(true);
    const result = calculate("Exército", "Cálculo por Margem Disponível", [
      { label, value },
    ]);

    if (result != "no valid labels" && result != undefined) {
      setResults(result.slice(0, 2));
      setTotal(result.slice(2, 5));
	  console.log("RESULT-> ", result);

      const finalResult: string[] = [
        `Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
        `Valor Parcela R$ ${result[1].split(" R$ ")[1]} 72x`,
        //total
        `VALOR TOTAL R$ ${result[2].split(" R$ ")[1]}`,
        //parcela
        `PARCELA TOTAL R$ ${result[3].split(" R$ ")[1]} 72x`,
      ];
      console.log("finalResult", finalResult);
      setFinalResult(finalResult);
    }
  }

  useEffect(() => {
    const allFilled = values.every((item) => item.value !== 0);
    setAllInputsFilled(allFilled);
  }, [values]);

  useEffect(() => {
    handleInputValue(values[0].label, values[0].value);
  }, [values[0].value]);

  return (
    <Flex className="calculatorComponentDiv">
      <CalculatorTitle
        menu="Exército"
        submenu="Cálculo por Margem Disponível"
      />
      <Flex className="inputsContainer">
        <FormControl>
          <FormLabel>{values[0].label}</FormLabel>
          <NumericFormat
            value={values[0].value}
            onValueChange={(values) => {
              const { floatValue } = values;
              handleInputValue("VALOR MARGEM EMPRÉSTIMO: ", floatValue ?? 0);
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
      <Flex
        className="answerContainer"
        style={{ height: "20vh", justifyContent: "flex-end", gap: "6vh" }}
      >
        <Flex className="resultsContainer" style={{ height: "fit-content" }}>
          <CalculatorResult result={results[0]} />
          <CalculatorResult result={results[1]} />
        </Flex>
        <Flex className="totaisContainer">
          {totais.slice(0, 3).map((total, index) => (
            <CalculatorTotal total={total} key={`totalExercito${index}`} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
