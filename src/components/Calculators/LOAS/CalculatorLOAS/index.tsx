import { useState } from "react";
import { calculate } from "../../../../utils/calculate";
import { CalculatorResult } from "../../../CalculatorResult";
import { CalculatorTitle } from "../../../CalculatorTitle";
import CalculatorTotal from "../../../CalculatorTotal";
import "../../INSS/CalculatorINSS4/calculatorINSS4.css";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

interface CalculatorLOASProps {
  isChecked: boolean;
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}

export function CalculatorLOAS({
  isChecked,
  setAllInputsFilled,
  setFinalResult,
}: CalculatorLOASProps) {
  const [values, setValues] = useState([{ label: "SALÁRIO: ", value: 0 }]);
  const [results, setResults] = useState([
    "VALOR MARGEM EMPRÉSTIMO: R$00.000,00",
    "VALOR MARGEM CARTÃO INSS: R$00.000,00",
    "VALOR EMPRÉSTIMO: R$00.000,00",
    "CARTÃO INSS: R$00.000,00",
    "VALOR CARTÃO ENVIADO: R$00.000,00",
    "PARCELA CARTÃO INSS: R$00.000,00",
    "PARCELA MARGEM CARTÃO ENVIADO: R$00.000,00",

    "LIBERA + O VALOR (APROXIMADO) DE: R$00.000,000",
  ]);
  const [totais, setTotais] = useState([
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "84x",

    "TOTAL: R$ 0,00",
    "(com redução)",
    "PARCELA R$ 0,00",
    "84x",
  ]);

  function handleInputValue(label: string, value: number) {
    if (value === 0) return;
    setValues([{ label, value }]);
    setAllInputsFilled(true);
    const result = calculate("LOAS REP LEGAL", "Cálculo Salário LOAS/BPC", [
      { label, value },
    ]);
    console.log("CHECKED", isChecked);
    if (typeof result === "string") {
      console.error(result);
      return;
    }

    if (Array.isArray(result) && result.length > 0) {
      setResults(result.slice(0, 7).concat(result.slice(7, 8)));
      setTotais(result.slice(8, 11).concat(result.slice(11, 15)));
      console.log("isChecked ", isChecked);
      const finalResult: string[] = [
        `Valor Empréstimo R$ ${result[2].split(" R$ ")[1]}`,
        `Valor Parcela R$ ${result[0].split(" R$ ")[1]} 84x`,
        `Valor Cartão INSS R$ ${result[3].split(" R$ ")[1]}`,
        `Parcela Cartão INSS R$ ${result[5].split(" R$ ")[1]} 84x`,
        `Valor Cartão Enviado R$ ${result[4].split(" R$ ")[1]}`,
        `Parcela Cartão Enviado R$ ${result[6].split(" R$ ")[1]} 84x`,
        //total sem extra
        `${
          isChecked
            ? "SUBTOTAL R$ " + result[8].split(" R$ ")[1]
            : "VALOR TOTAL R$ " + result[8].split(" R$ ")[1]
        }`,
        //parcela sem extra
        `${
          isChecked
            ? "PARCELA R$ " + result[9].split(" R$ ")[1]
            : "PARCELA TOTAL R$ " + result[9].split(" R$ ")[1]
        } 84x`,

        isChecked ? `R$ ${result[7].split(" R$ ")[1]}` : "",
        // total com extra
        isChecked ? `VALOR TOTAL R$ ${result[11].split(" R$ ")[1]}` : "",
        // parcela com extra
        isChecked ? `PARCELA TOTAL R$ ${result[13].split(" R$ ")[1]} 84x` : "",
      ];
      console.log("Final result: ", finalResult);
      setFinalResult(finalResult.filter((str) => str !== ""));
    }
  }

  // useEffect(() => {
  //   const allFilled = values.every((item) => item.value !== 0);
  //   setAllInputsFilled(allFilled);
  // }, [values]);

  // useEffect(() => {
  //   console.log("values changing", values[0].value);
  //   handleInputValue(values[0].label, values[0].value);
  // }, [values, isChecked]);

  return (
    <Flex className="calculatorComponentDiv" id="calculatorComponentDivINSS4">
      <CalculatorTitle
        menu="LOAS REP LEGAL"
        submenu="Cálculo Salário LOAS/BPC"
      />
      <Flex className="inputsContainer" id="inputsContainerINSS4">
        <FormControl>
          <FormLabel>{values[0].label}</FormLabel>
          <InputGroup>
            <NumericFormat
              value={String(values[0].value)}
              valueIsNumericString
              onValueChange={(v) => {
                const { floatValue } = v;
                handleInputValue(values[0].label, floatValue as number);
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
      <Flex className="answerContainer" style={{ height: "34vh" }}>
        <Flex
          className="resultsContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "200px",
            rowGap: "18px",
            height: "max-content",
            alignContent: "flex-start",
            padding: "30px",
            width: "100%",
          }}
        >
          <CalculatorResult result={results[0]} />
          <CalculatorResult result={results[1]} />
          <CalculatorResult result={results[2]} />
          <CalculatorResult result={results[3]} />
          <CalculatorResult result={results[4]} />
          <CalculatorResult result={results[5]} />
          <CalculatorResult result={results[6]} />
        </Flex>
        <Flex className="totaisContainer">
          {totais.slice(0, 3).map((total, index) => (
            <CalculatorTotal
              total={total}
              key={`calculatorsubtotal+${index}`}
            />
          ))}
        </Flex>
      </Flex>
      {isChecked && (
        <Flex
          className="answerContainer"
          style={{
            justifyContent: "end",
            height: "fit-content",
          }}
        >
          <Flex
            className="resultsContainer"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "200px",
              rowGap: "8px",
              height: "max-content",
              padding: "30px",
              width: "100%",
            }}
          >
            <CalculatorResult result={results[7]} />
            <p>
              APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.
            </p>
          </Flex>
          <Flex className="totaisContainer" style={{ fontSize: "0.9rem" }}>
            {totais.slice(3, 7).map((total, index) => (
              <CalculatorTotal total={total} key={`total+${index}`} />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
