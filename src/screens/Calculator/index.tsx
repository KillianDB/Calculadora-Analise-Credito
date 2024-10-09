import React, { useState } from "react";
import "./Calculator.css";
import { CalculatorINSS1 } from "../../components/Calculators/CalculatorINSS1";
import { CalculatorINSS2 } from "../../components/Calculators/CalculatorINSS2";
import { CalculatorINSS3 } from "../../components/Calculators/CalculatorINSS3";
import { CalculatorINSS4 } from "../../components/Calculators/CalculatorINSS4";
import { CalculatorINSS5 } from "../../components/Calculators/CalculatorINSS5";
import { CalculatorIMGResult } from "../CalculatorIMGResult";
import axios from "axios";
import { CalculatorLOAS } from "../../components/Calculators/CalculatorLOAS";
import { CalculatorExercito1 } from "../../components/Calculators/CalculatorExercito1";
import { CalculatorExercito2 } from "../../components/Calculators/CalculatorExercito2";
import { CalculatorPrefeitura } from "../../components/Calculators/CalculatorPrefeituras";
import Menu from "../../components/Menu";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";

function Calculator() {
  const [menu, setMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [finalResult, setFinalResult] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [parcelModalIsOpen, setParcelModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [parcelas, setParcelas] = useState("");
  const token = localStorage.getItem("token");

  function toggleCheckbox() {
    console.log("isChecked", isChecked);
    setIsChecked(!isChecked);
  }

  function handleMenuChange(newMenu: React.SetStateAction<string>) {
    setMenu(newMenu);
    setSubmenu("");
    filterSubmenuOptions(newMenu.toString());
  }

  function filterSubmenuOptions(menu: string) {
    if (menu === "INSS") {
      return [
        "Submenu",
        "Possibilidades Gerais",
        "Cálculo Salário Cliente",
        "Cálculo Salário Cliente Sem Cartões",
        "Cálculo Valor Solicitado",
        "Cálculo por Margem Disponível",
      ];
    } else if (menu === "LOAS REP LEGAL") {
      return ["Submenu", "Cálculo Salário LOAS/BPC"];
    } else if (menu === "EXERCITO") {
      return [
        "Submenu",
        "Possibilidades Gerais",
        "Cálculo por Margem Disponível",
      ];
    } else if (menu === "PREFEITURA") {
      return ["Submenu", "DAYCOVAL", "ASPECIR", "SANTANDER", "VALOR"];
    } else {
      return ["Submenu"];
    }
  }

  function renderCalculatorByMenus(menu: string, submenu: string) {
    console.log("menu", menu);
    if (menu === "" || submenu === "" || submenu === "Submenu") {
      return (
        <>
          <div className="calculatorComponentDiv">
            <h2>Selecione valores de menu e submenu para calcular</h2>
          </div>
        </>
      );
    } else if (menu === "INSS" && submenu === "Cálculo por Margem Disponível") {
      return (
        <CalculatorINSS1
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (menu === "INSS" && submenu === "Cálculo Valor Solicitado") {
      return (
        <CalculatorINSS2
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (
      menu === "INSS" &&
      submenu === "Cálculo Salário Cliente Sem Cartões"
    ) {
      return (
        <CalculatorINSS3
          isChecked={isChecked}
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (menu === "INSS" && submenu === "Cálculo Salário Cliente") {
      return (
        <CalculatorINSS4
          isChecked={isChecked}
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (menu === "INSS" && submenu === "Possibilidades Gerais") {
      return (
        <CalculatorINSS5
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (
      menu === "LOAS REP LEGAL" &&
      submenu === "Cálculo Salário LOAS/BPC"
    ) {
      return (
        <CalculatorLOAS
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
          isChecked={isChecked}
        />
      );
    } else if (
      menu == "EXERCITO" &&
      submenu == "Cálculo por Margem Disponível"
    ) {
      return (
        <CalculatorExercito1
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (menu == "EXERCITO" && submenu == "Possibilidades Gerais") {
      return (
        <CalculatorExercito2
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
        />
      );
    } else if (menu == "PREFEITURA" && submenu == "DAYCOVAL") {
      return (
        <CalculatorPrefeitura
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
          banco="DAYCOVAL"
        />
      );
    } else if (menu == "PREFEITURA" && submenu == "ASPECIR") {
      return (
        <CalculatorPrefeitura
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
          banco="ASPECIR"
        />
      );
    } else if (menu == "PREFEITURA" && submenu == "SANTANDER") {
      return (
        <CalculatorPrefeitura
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
          banco="SANTANDER"
        />
      );
    } else if (menu == "PREFEITURA" && submenu == "VALOR") {
      return (
        <CalculatorPrefeitura
          setAllInputsFilled={setAllInputsFilled}
          setFinalResult={setFinalResult}
          banco="VALOR"
        />
      );
    }
  }

  function handleSubmenuChange(
    menu: string,
    newSubmenu: React.SetStateAction<string>
  ) {
    setSubmenu(newSubmenu);
    renderCalculatorByMenus(menu, newSubmenu.toString());
  }

  function handleResultDownload() {
    if (
      menu === "INSS" &&
      submenu === "Cálculo Valor Solicitado" &&
      parcelas == ""
      // ||
      // (menu === "PREFEITURA" && parcelas == "")
    ) {
      setParcelModalIsOpen(true);
    } else {
      console.log("final result", finalResult);
      setModalIsOpen(true);
    }
  }

  const handleDownloadImage = async () => {
    const element = document.getElementById("calculatorIMGResult");
    if (element) {
      console.log("Baixando a imagem");
      console.log("token", token);
      try {
        const response = await axios.post(
          "https://calculadora.reallcredito.com.br/calculator/image",
          {
            menu,
            submenu,
            element: element.outerHTML,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // .then((response) => {
        // console.log("Imagem gerada com sucesso!", response.data);
        // const link = document.createElement("a");
        // link.href = response.data.downloadURL;
        // link.click();
        if (response.status === 200) {
          window.location.href = response.data;
          // window.open(response.data, "_blank");
          console.log("Redirecionando", response.data);
        }
        // })
      } catch (error) {
        console.error("Erro ao gerar a imagem:", error);
      }
    } else {
      console.log("Não foi possível encontrar o elemento ", element);
      alert("Não foi possível encontrar o elemento para gerar a imagem.");
    }
  };

  return (
    <>
      <main className="body_colaborators">
        <Menu type="colaborator" />
        <div className="linha"></div>

        <div className="divMenus">
          <select
            onChange={(e) => handleMenuChange(e.target.value)}
            title="Menu"
          >
            <option value="">Menu</option>
            <option value="INSS">INSS</option>
            <option value="LOAS REP LEGAL">LOAS REP LEGAL</option>
            <option value="EXERCITO">EXERCITO</option>
            <option value="PREFEITURA">PREFEITURA</option>
          </select>
          <select
            onChange={(e) => handleSubmenuChange(menu, e.target.value)}
            defaultValue="Submenu"
          >
            {filterSubmenuOptions(menu).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {submenu.slice(0, 15) === "Cálculo Salário" && (
            <label className="checkboxDiv">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                className="checkbox"
              />
              Bônus após três meses
            </label>
          )}
          {allInputsFilled && (
            <div>
              <button
                className="buttonBaixarResultado"
                onClick={handleResultDownload}
              >
                Visualizar Resultado
              </button>
            </div>
          )}
        </div>
        {/* Modal para escolher a quantidade de parcelas */}
        <Modal
          isOpen={parcelModalIsOpen}
          onClose={() => setParcelModalIsOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecione o número de parcelas</ModalHeader>
            <ModalCloseButton onClick={() => setParcelas("")} />
            <ModalBody>
              <p>
                Selecione o número de parcelas do resultado que deseja baixar
                para enviar para o cliente
              </p>
              <Select
                placeholder="Selecione"
                value={parcelas}
                onChange={(e) => setParcelas(e.target.value)}
                mt={4}
              >
                <option value="84">84x (84 parcelas)</option>
                <option value="72">72x (72 parcelas)</option>
                <option value="60">60x (60 parcelas)</option>
                <option value="48">48x (48 parcelas)</option>
                <option value="36">36x (36 parcelas)</option>
                <option value="24">24x (24 parcelas)</option>
              </Select>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button colorScheme="blue" mr={3} onClick={handleResultDownload}>
                Confirmar
              </Button>
              <Button onClick={() => setParcelModalIsOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para exibir o resultado */}
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecione o número de parcelas</ModalHeader>
            <ModalCloseButton onClick={() => setParcelas("")} />
            <ModalBody>
              <CalculatorIMGResult
                menu={menu}
                submenu={submenu}
                values={finalResult}
                isChecked={isChecked}
                parcelas={parcelas}
              />
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button colorScheme="blue" mr={3} onClick={handleDownloadImage}>
                Baixar Imagem
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {renderCalculatorByMenus(menu, submenu)}
      </main>
    </>
  );
}

export default Calculator;
