import { Key, useState } from "react";
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

export function CalculatorPrefeituraAspecir({
  setAllInputsFilled,
  setFinalResult,
  banco,
}: {
  setAllInputsFilled: (filled: boolean) => void;
  setFinalResult: (result: string[]) => void;
  banco: string;
}) {
  const paramsString = localStorage.getItem("calculatorParams");
  if (!paramsString) return "no parameters found";

  const params = JSON.parse(paramsString);
  const PrefeituraValues = params?.PREFEITURA?.["ASPECIR"]?.values || [];
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

    let coeficienteValorLiberadoASPECIR = +PrefeituraValues?.find(
      (v: any) => v.key == "coeficiente_valor_liberado"
    )?.value;
    let coeficiente84xASPECIR = +PrefeituraValues?.find(
      (v: any) => v.key == "coeficiente_84x"
    )?.value;

    setAllInputsFilled(true);
    setResult([
      "VALOR LIBERADO:",
      `R$ ${formatNumber(value / coeficienteValorLiberadoASPECIR)}`,
      "84x",
    ]);
    setTotais([
      `TOTAL: R$ ${formatNumber(value / coeficiente84xASPECIR)}`,
      `PARCELA R$ ${formatNumber(value)}`,
      "84x",
    ]);

    const finalResult: string[] = [
      `Valor Empréstimo R$ ${formatNumber(value / coeficiente84xASPECIR)}`,
      `VALOR TOTAL R$ ${formatNumber(value / coeficiente84xASPECIR)}`,
      `PARCELA TOTAL R$ ${formatNumber(value)} 84x`,
    ];
    setFinalResult(finalResult);
  }

  function chunkArray(array: string[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

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
                value={values[0].value}
                onValueChange={(number) => {
                  const { floatValue } = number;
                  handleInputValue(values[0].label, floatValue ?? 0);
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
