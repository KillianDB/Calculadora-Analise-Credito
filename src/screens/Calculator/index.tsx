import React, { useEffect, useRef, useState } from "react";
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
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useUser } from "../../contexts/UserContext";
import { Checkbox } from "antd";
import { useAppToast } from "../../utils/toaster";

function Calculator() {

  const { showToast } = useAppToast();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [menu, setMenu] = useState("");
  const [submenu, setSubmenu] = useState("Submenu");
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [finalResult, setFinalResult] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [parcelModalIsOpen, setParcelModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [parcelas, setParcelas] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useUser();
  console.log("user-> ", user);
  const [clientName, setClientName] = useState("");
  const [NameModalIsOpen, setNameModalIsOpen] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  function toggleCheckbox() {
    console.log("isChecked", isChecked);
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    console.log("Modal is open ", modalIsOpen);

    if (modalIsOpen) {
      const timeout = setTimeout(() => {
        const ref = modalBodyRef.current;
        if (!ref) return;
        if (modalBodyRef.current) {
          const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
              const { width, height } = entry.contentRect;
              console.log("Width: ", width, "Height: ", height);
              setDimensions({ width, height });
            }
          });

          observer.observe(ref);
        }
      }, 100); // delay para esperar render
      return () => clearTimeout(timeout);
    }
  }, [modalIsOpen]);

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
    // setParcelas("");
    // setClientName("");
    if (menu === "" || submenu === "" || submenu === "Submenu") {
      return (
        <>
<div className="calculatorComponentDiv" style={{
  height: "fit-content",
  minHeight: "30vh",
  justifyContent: "center",
}}>
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
      submenu === "Cálculo Valor Solicitado"
      // ||
      // (menu === "PREFEITURA" && parcelas == "")
    ) {
      setParcelModalIsOpen(!parcelModalIsOpen);
    } else {
      console.log("final result", finalResult);
      // document.body.classList.add("no-scroll");
      // document.styleSheets[0].insertRule(
      //   "body.no-scroll { overflow: hidden; }",
      // );
      // setModalIsOpen(!modalIsOpen);
      setNameModalIsOpen(!NameModalIsOpen);
    }
  }
  async function handleDownloadImage() {
    setIsGeneratingImage(true);
    try {
      const element = document.getElementById("calculatorIMGResult");
      if (!element) return;

      // Clonar o elemento para não afetar o DOM original
      const elementClone = element.cloneNode(true) as HTMLElement;

      // Remover transformações de escala e ajustar para tamanho original
      elementClone.style.transform = "none";
      elementClone.style.width = "891px";
      elementClone.style.minHeight = "1644px";
      elementClone.style.padding = "40px 20px";

      // Ajustar todos os estilos internos para o tamanho original (scale=1)
      const scaledElements = elementClone.querySelectorAll('[style*="scale"]');
      scaledElements.forEach((el) => {
        (el as HTMLElement).style.transform = "none";
      });

      // Converter todas as unidades de estilo para valores originais (891px base)
      const stylesToFix = elementClone.querySelectorAll("[style]");
      stylesToFix.forEach((el) => {
        const style = el.getAttribute("style");
        // Converter valores escalados para originais (dividir por 0.48)
        const fixedStyle = style
          ? style.replace(/(\d+\.?\d*)px/g, (match, p1) => {
            console.log("match", match);
              return parseFloat(p1) / 0.48 + "px";
            })
          : "";
        el.setAttribute("style", fixedStyle);
      });

      // Adicionar fontes necessárias
      const style = document.createElement("style");
      style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700;800;900&display=swap');
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `;
      elementClone.prepend(style);

      const response = await axios.post(
        "https://api.creditorealsf.com/calculator/image",
        {
          menu,
          submenu,
          element: elementClone.outerHTML,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showToast("Imagem gerada com sucesso!", "success");
        // window.location.href = response.data;
        window.open(response.data, "_blank");
        console.log("Redirecionando", response.data);
        return;
      }
      showToast(
        response?.data || "Falha ao gerar imagem", 
        "error",
        8000 // Duração maior para erros
      );
    } catch (error) {
      console.error("Error generating image:", error);
      showToast("Erro ao gerar a imagem", "error");
    } finally {
      setIsGeneratingImage(false); // Desativa o loading independente do resultado
    }
  }
  // const handleDownloadImage = async () => {
  //   setParcelas("");
  //   setClientName("");
  //   const element = document.getElementById("calculatorIMGResult");
  //   if (element) {
  //     console.log("Baixando a imagem");
  //     console.log("token", token);
  //     try {
  //       const response = await axios.post(
  //         "https://api.creditorealsf.com/calculator/image",
  //         {
  //           menu,
  //           submenu,
  //           element: element.outerHTML,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // .then((response) => {
  //       // console.log("Imagem gerada com sucesso!", response.data);
  //       // const link = document.createElement("a");
  //       // link.href = response.data.downloadURL;
  //       // link.click();
  //       if (response.status === 200) {
  //         // window.location.href = response.data;
  //         window.open(response.data, "_blank");
  //         console.log("Redirecionando", response.data);
  //       }
  //       // })
  //     } catch (error) {
  //       console.error("Erro ao gerar a imagem:", error);
  //     }
  //   } else {
  //     console.log("Não foi possível encontrar o elemento ", element);
  //     alert("Não foi possível encontrar o elemento para gerar a imagem.");
  //   }
  // };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setParcelas("");
    setClientName("");
    setParcelModalIsOpen(false);
    setNameModalIsOpen(false);
  };

  return (
    <>
      <Flex className="body_colaborators">
        <Menu type="colaborator" />
        <Flex className="linha"></Flex>

        <Flex className="divMenus">
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
            value={submenu}
          >
            {filterSubmenuOptions(menu).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {submenu.slice(0, 15) === "Cálculo Salário" && (
            <label className="checkboxDiv">
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                className="checkbox"
              />
              Bônus após três meses
            </label>
          )}
          {allInputsFilled && (
            <Flex>
              <Button
                className="buttonBaixarResultado"
                onClick={handleResultDownload}
              >
                Visualizar Resultado
              </Button>
            </Flex>
          )}
        </Flex>
        {/* Modal para escolher a quantidade de parcelas */}
        <Modal isOpen={parcelModalIsOpen} onClose={() => handleCloseModal()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecione o número de parcelas</ModalHeader>
            <ModalCloseButton onClick={() => handleCloseModal()} />
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
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => setNameModalIsOpen(true)}
              >
                Confirmar
              </Button>
              <Button onClick={() => setParcelModalIsOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para adicionar nome do cliente */}
        <Modal isOpen={NameModalIsOpen} onClose={() => handleCloseModal()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nome do(a) cliente</ModalHeader>
            <ModalCloseButton onClick={() => handleCloseModal()} />
            <ModalBody>
              <p>Digite o primeiro nome do(a) cliente</p>
              <Input
                placeholder="Nome do(a) cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                mt={4}
              />
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => setModalIsOpen(true)}
              >
                Confirmar
              </Button>
              <Button onClick={() => setNameModalIsOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para exibir o resultado */}
        <Modal isOpen={modalIsOpen} onClose={() => handleCloseModal()}>
          <ModalOverlay />
          <ModalContent
            h={"90vh"}
            margin={"5vh"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <ModalHeader>Pré-visualização do resultado</ModalHeader>
            <ModalCloseButton onClick={() => setParcelas("")} />
            <ModalBody
              ref={modalBodyRef}
              maxH={"71vh"}
              padding={"0"}
              minH={"511px"}
              minW={"269px"}
            >
              <CalculatorIMGResult
                menu={menu}
                clientName={clientName}
                isPartner={user?.usertype === "enterprise"}
                logo={user?.logo? user?.logo : undefined}
                phone=
                {user?.usertype === "enterprise" ? user.phone : "08006080181"}
                values={finalResult}
                containerWidth={dimensions.width}
                containerHeight={dimensions.height}
                hasSubtotal={isChecked}
                parcelas={parcelas}
              />
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleDownloadImage}
                isLoading={isGeneratingImage}
                loadingText="Gerando..."
              >
                Gerar Imagem
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {renderCalculatorByMenus(menu, submenu)}
      </Flex>
    </>
  );
}

export default Calculator;
