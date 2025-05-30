import { useEffect, useState } from "react";
import { calculate } from "../../../../utils/calculate";
import { CalculatorResult } from "../../../CalculatorResult";
import { CalculatorTitle } from "../../../CalculatorTitle";
import CalculatorTotal from "../../../CalculatorTotal";
import "./calculatorINSS4.css";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

interface CalculatorINSS4Props {
  isChecked: boolean;
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
}

export function CalculatorINSS4({
  isChecked,
  setAllInputsFilled,
  setFinalResult,
}: CalculatorINSS4Props) {
  const [values, setValues] = useState([{ label: "SALÁRIO: ", value: 0 }]);
  const [results, setResults] = useState([
    "VALOR EMPRÉSTIMO: R$00.000,00",
    "VALOR MARGEM EMPRÉSTIMO: R$00.000,00",
    "CARTÃO INSS: R$00.000,00",
    "VALOR MARGEM CARTÃO INSS: R$00.000,00",
    "CARTÃO BENEFÍCIO: R$00.000,00",
    "VALOR MARGEM CARTÃO BENEFÍCIO: R$00.000,00",
    "VALOR CARTÃO ENVIADO: R$00.000,00",
    "VALOR MARGEM CARTÃO ENVIADO: R$00.000,00",

    "SALDO DEVEDOR (APROXIMADO): R$00.000,00",
    "PARCELA: R$00.000,00",
    "VALOR REDUÇÃO DE JUROS (VALOR LIQUÍDO APROXIMADO): R$00.000,00",
    "LIBERA + O VALOR (APROXIMADO) DE: R$00.000,000",
    "APÓS 03 PARCELAS PAGAS NA REDUÇÃO DE JUROS SEM ALTERAR A PARCELA.",
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
    const result = calculate("INSS", "Cálculo Salário Cliente", [
      { label, value },
    ]);

    if (Array.isArray(result) && result.length > 0) {
      setResults(result.slice(0, 8).concat(result.slice(11, 16)));
      setTotais(result.slice(8, 11).concat(result.slice(16, 19)));
      console.log("isChecked ", isChecked);
      const finalResult: string[] = [
        `Valor Empréstimo R$ ${result[0].split(" R$ ")[1]}`,
        `Valor Parcela R$ ${result[1].split(" R$ ")[1]} 84x`,
        `Valor Cartão R$ ${result[19]}`,
        `Parcela Cartão R$ ${result[20]} 84x`,
        `Valor Cartão Enviado R$ ${result[6].split(" R$ ")[1]}`,
        `Parcela Cartão Enviado R$ ${result[7].split(" R$ ")[1]} 84x`,
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

        isChecked ? `R$ ${result[14].split(" R$ ")[1]}` : "",
        // total com extra
        isChecked ? `VALOR TOTAL R$ ${result[16].split(" R$ ")[1]}` : "",
        // parcela com extra
        isChecked ? `PARCELA TOTAL R$ ${result[17].split(" R$ ")[1]} 84x` : "",
      ];
      console.log("Final result: ", finalResult);
      setFinalResult(finalResult.filter((str) => str !== ""));
    }
  }

  useEffect(() => {
    const allFilled = values.every((item) => item.value !== 0);
    setAllInputsFilled(allFilled);
  }, [values]);

  useEffect(() => {
    console.log("values changing", values[0].value);
    handleInputValue(values[0].label, values[0].value);
  }, [values, isChecked]);

  return (
    <Flex className="calculatorComponentDiv" id="calculatorComponentDivINSS4">
      <CalculatorTitle menu="INSS" submenu="Cálculo Salário Cliente" />
      <Flex className="inputsContainer" id="inputsContainerINSS4">
        <FormControl>
          <FormLabel>{values[0].label}</FormLabel>
          <InputGroup>
            <NumericFormat
              value={String(values[0].value)}
              valueIsNumericString
              onValueChange={(values) => {
                const { floatValue } = values;
                setValues([
                  { label: "SALÁRIO: ", value: Number(floatValue) || 0 },
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
          <CalculatorResult result={results[7]} />
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
            <CalculatorResult result={results[8]} />
            <CalculatorResult result={results[9]} />
            <CalculatorResult result={results[10]} />
            <p></p>
            <CalculatorResult result={results[11]} />
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
