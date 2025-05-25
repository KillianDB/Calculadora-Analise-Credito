import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import OrangeButton from "../../components/OrangeButton";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import Input from "../../components/Input";
import "./coeficientes.css";
import { useCalculatorParams } from '../../contexts/CalculatorContext';

  // {
  //       "menu": "Prefeitura",
  //       "submenu": "VALOR",
  //       "value": {
  //           "coeficiente_valor_liberado": 0.0749,
  //           "coeficiente_24x": 0.0946,
  //           "coeficiente_18x": 0.11345,
  //           "coeficiente_12x": 0.13996,
  //           "coeficiente_10x": 0.1593
  //       },
  //       "id": "4YcAKLNZVcVYfZT2hpdE"
  //   },

 export function Coeficientes() {
  interface Coeficiente {
    id: string;
    menu: string;
    submenu: string;
    value: {
      [key: string]: number;  // Defina value como um objeto com chaves string e valores number
    };
  }

  const [selectedCoeficiente, setSelectedCoeficiente] = useState<Coeficiente | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>(""); // Para armazenar a chave selecionada (ex: "coeficiente_valor_liberado")
  const [newValue, setNewValue] = useState<string>("");
  const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([]);

  // Função para lidar com a seleção de coeficiente
  const handleCoeficienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = coeficientes.find((c) => c.id === selectedId);
    if (selected) {
      setSelectedCoeficiente(selected);
      setSelectedKey(""); // Resetar a chave selecionada ao mudar de coeficiente
      setNewValue(""); // Resetar o valor
    }
  };

  // Função para lidar com a seleção da chave do coeficiente
  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedKey(key);
    
    // Define o valor atual no campo de input
    if (selectedCoeficiente && key) {
      setNewValue(selectedCoeficiente.value[key].toString());
    } else {
      setNewValue("");
    }
  };

  const editarCoeficiente = async () => {
    if (!selectedCoeficiente || !selectedKey) return;

    // Cria uma cópia do objeto value atual
    const updatedValue = { ...selectedCoeficiente.value };
    // Atualiza apenas a chave selecionada com o novo valor
    updatedValue[selectedKey] = parseFloat(newValue);

    try {
      const response = await fetch(
        `https://api.creditorealsf.com/coefficients/${selectedCoeficiente.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: selectedCoeficiente.id,
            menu: selectedCoeficiente.menu,
            submenu: selectedCoeficiente.submenu,
            value: updatedValue, // Envia o objeto value atualizado
          }),
        }
      );

      if (response.status === 200) {
        // Atualiza o estado local após a edição bem-sucedida
        const updatedCoeficientes = coeficientes.map(c => 
          c.id === selectedCoeficiente.id 
            ? { ...c, value: updatedValue } 
            : c
        );
        setCoeficientes(updatedCoeficientes);
        setSelectedCoeficiente({ ...selectedCoeficiente, value: updatedValue });
        alert("Coeficiente atualizado com sucesso!");
      } else {
        console.error("Erro ao editar coeficiente");
        alert("Erro ao atualizar coeficiente. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao editar coeficiente:", error);
      alert("Erro ao atualizar coeficiente. Tente novamente.");
    }
  };

  // Resto do código...

  return (
    <>
      <main className="main_equipes">
        <Menu type="admin" />
        <div className="linha"></div>

        <section className="coeficientes_section">
            <div className="equipe_equipes">
            <CalculatorTitle menu="Alterar Coeficiente" />
            
            {/* Seleção do coeficiente (menu/submenu) */}
            <select 
              value={selectedCoeficiente?.id || ""} 
              onChange={handleCoeficienteChange}
              className="select-coeficiente"
            >
              <option value="">Selecione um coeficiente</option>
              {Array.isArray(coeficientes) && coeficientes.map((coeficiente: Coeficiente) => (
              <option key={coeficiente.id} value={coeficiente.id}>
                {coeficiente.menu} - {coeficiente.submenu}
              </option>
              ))}
            </select>

            {/* Seleção da chave específica a ser editada */}
            {selectedCoeficiente && (
              <>
              <h5 className="coeficiente-title">
                {selectedCoeficiente.menu} - {selectedCoeficiente.submenu}
              </h5>
              
              <select 
                value={selectedKey} 
                onChange={handleKeyChange}
                className="select-key"
              >
                <option value="">Selecione o tipo de coeficiente</option>
                {Object.entries(selectedCoeficiente.value).map(([key, value]) => (
                <option key={key} value={key}>
                  {key.replace('coeficiente_', '')} ({value})
                </option>
                ))}
              </select>
              </>
            )}

            {/* Exibição do valor atual e campo para novo valor */}
            {selectedKey && (
              <>
              <h6 className="current-value">
                Valor atual: {selectedCoeficiente?.value[selectedKey]}
              </h6>
              <Input
                type="number"
                label="Novo valor: "
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              </>
            )}
            
            {/* Botão de salvar */}
            <OrangeButton
              text="Salvar"
              onClick={editarCoeficiente}
              disabled={!selectedCoeficiente || !selectedKey || newValue === ""}
            />
            </div>
        </section>
      </main>
    </>
  );
}