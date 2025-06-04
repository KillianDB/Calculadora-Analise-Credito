import { Key, useEffect, useState } from "react";
import { CalculatorTitle } from "../../../CalculatorTitle";
import CalculatorTotal from "../../../CalculatorTotal";
import "../prefeituras.css";
import { formatNumber } from "../../../../utils/formatNumbers";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export function CalculatorPrefeituraValor({
  setAllInputsFilled,
  setFinalResult,
  banco,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
  banco: string;
}) {
  const [values, setValues] = useState([
    { label: "CÁLCULO DE VALOR  POR PARCELA: ", value: 0 },
  ]);
  const [result, setResult] = useState(["VALOR LIBERADO:", "R$ 0,00", "84x"]);
  const [totais, setTotais] = useState([
    "TOTAL: R$ 0,00",
    "PARCELA R$ 0,00",
    "84x",
    // "TOTAL: R$ 0,00",
    // "PARCELA R$ 0,00",
    // "72x",
    // "TOTAL: R$ 0,00",
    // "PARCELA R$ 0,00",
    // "60x",
    // "TOTAL: R$ 0,00",
    // "PARCELA R$ 0,00",
    // "48x",
    // "TOTAL: R$ 0,00",
    // "PARCELA R$ 0,00",
    // "36x",
    // "TOTAL: R$ 0,00",
    // "PARCELA R$ 0,00",
    // "24x",
  ]);

  function handleInputValue(label: string, value: number) {
    if (value === 0) return;
    setValues([{ label, value }]);

     const paramsString = localStorage.getItem("calculatorParams");
     console.log("paramsString: ", paramsString);
  if (!paramsString) return "no parameters found";

  const params = JSON.parse(paramsString);

    let coeficienteValorLiberadoVALOR = +params?.PREFEITURA?.["VALOR"]?.["coeficiente_valor_liberado"].value;
    let coeficiente84xVALOR = +params?.PREFEITURA?.["VALOR"]?.["coeficiente_84x"].value;

      setResult([
        "VALOR LIBERADO:",
        `R$ ${formatNumber(value / coeficienteValorLiberadoVALOR)}`,
        "84x",
      ]);
      setTotais([
        `TOTAL: R$ ${formatNumber(value / coeficiente84xVALOR)}`,
        `PARCELA R$ ${value}`,
        "84x",
      ]);

    const finalResult: string[] = [
      `Valor Empréstimo R$ ${formatNumber(value / coeficiente84xVALOR)}`,
      `VALOR TOTAL R$ ${formatNumber(value / coeficiente84xVALOR)}`,
      `PARCELA TOTAL R$ ${formatNumber(value)} 84x`,
    ];
    setFinalResult(finalResult);
    console.log("finalResult", finalResult);
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
    values.map((item) =>
      item.value !== 0 ? handleInputValue(item.label, item.value) : null
    );
  }, [setAllInputsFilled]);

  const chunkedTotais = chunkArray(totais, 3);
  const chunkedLiberado = chunkArray(result.slice(0, 3), 3);

  return (
    <Flex className="calculatorComponentDiv" id="calculatorComponentDivTwo">
      <CalculatorTitle menu="Prefeituras" submenu={banco} />
      <Flex className="inputsContainer">
        <FormControl>
          <FormLabel>{values[0].label}</FormLabel>
          <InputGroup>
            <NumericFormat
              key={values[0].label}
              valueIsNumericString
              onValueChange={(values) => {
                const { floatValue } = values;
                setValues([
                  {
                    label: "CÁLCULO DE VALOR  POR PARCELA: ",
                    value: Number(floatValue) || 0,
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
        {chunkedLiberado.map((chunk, index) => (
          <Flex key={index} className="totaisContainer">
            {chunk.map((total: string, subIndex: Key | null | undefined) => (
              <CalculatorTotal key={subIndex} total={total} />
            ))}
          </Flex>
        ))}
        <h3 className="atencaoPrefeituras">
          ATENÇÃO: Enviar simulação no prazo abaixo de 84x somente quando o
          cliente solicitar - Comissão diminui os prazos menores.
        </h3>
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
