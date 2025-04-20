import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton/index.tsx";
import SubmitCard from "../../components/SubmitCard/index.tsx";
import "./completeAnalysis.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext.tsx";
import axios from "axios";
import Menu from "../../components/Menu/index.tsx";
import { Flex, Grid, Img } from "@chakra-ui/react";

export function CompleteAnalysis() {
  const { user } = useContext(UserContext) ?? { user: undefined };
  if (!user) {
    throw new Error("User not found");
  }

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    cpf: "",
    birthday: "",
    cep: "",
    profissionalClass: "",
    income: 0,
    cellphone: "",
    gender: "",
  });

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name: label, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [label]: value,
    }));
    console.log(label, value);
  }

  async function handleGenerateAnalysis() {
    console.log("Gerando análise");
    console.log("inputs ", inputs);

    try {
      console.log("user", user);
      console.log("inputs", inputs);
      const response = await axios.post(
        "https://api.creditorealsf.com/banks",
        {
          body: {
            birthday: inputs.birthday,
            cellphone: inputs.cellphone,
            cpf: inputs.cpf,
            cep: inputs.cep,
            name: inputs.name,
            profissionalClass: inputs.profissionalClass,
            income: inputs.income,
            gender: inputs.gender,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      navigate("/loading", { state: response });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <>
      <Flex className="body_colaborators">
        <Menu type="colaborator" />
        <Flex className="linha"></Flex>
        <Flex className="home-main-div">
          <Grid className="analisis-buttons-div">
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/analise-credito-pessoal.svg?alt=media&token=2402fdd2-1c6e-4a68-a4b5-bbca206edd84"
              className="analisis-buttons"
            />
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/consignacao-do-inss.svg?alt=media&token=732ec6bb-fce3-4a9e-a418-afaac4ab5299"
              className="analisis-buttons"
            />
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/saque-de-fgts.svg?alt=media&token=ba63e5ff-97e0-4c65-bbf8-03f63a66fe1d"
              className="analisis-buttons"
            />
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/financiamento-veicular.svg?alt=media&token=6311511c-df3c-49a4-b8b6-205c69f945e8"
              className="analisis-buttons"
            />
          </Grid>
          <SubmitCard
            title="Insira os dados do cliente"
            inputs={[
              {
                label: "Nome",
                name: "name",
                type: "text",
                value: inputs.name,
                onChange: handleInputChange,
              },
              {
                label: "CPF",
                name: "cpf",
                type: "text",
                value: inputs.cpf,
                onChange: handleInputChange,
              },
              {
                label: "CEP",
                name: "cep",
                type: "text",
                value: inputs.cep,
                onChange: handleInputChange,
              },
              {
                label: "Categoria Profissional",
                name: "profissionalClass",
                type: "select",
                value: inputs.profissionalClass,
                onChange: handleInputChange,
                options: ["ASSALARIADO", "PENSIONISTA", "APOSENTADO"],
              },
              {
                label: "Renda",
                name: "income",
                type: "number",
                value: inputs.income.toString(),
                onChange: handleInputChange,
              },
              {
                label: "Data de Nascimento",
                name: "birthday",
                value: inputs.birthday,
                type: "date",
                onChange: handleInputChange,
              },
              {
                label: "Celular",
                name: "cellphone",
                type: "text",
                value: inputs.cellphone,
                onChange: handleInputChange,
              },
              {
                label: "Gênero",
                name: "gender",
                type: "select",
                value: inputs.gender,
                onChange: handleInputChange,
                options: ["FEMININO", "MASCULINO"],
              },
            ]}
            button={
              <OrangeButton
                text="Gerar análise"
                onClick={handleGenerateAnalysis}
              />
            }
          />
        </Flex>
      </Flex>
    </>
  );
}
