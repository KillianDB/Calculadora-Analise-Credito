import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import OrangeButton from "../../components/OrangeButton";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import Input from "../../components/Input";
import "./coeficientes.css";

interface Coeficiente {
  id: string;
  menu: string;
  submenu: string;
  value: {
    [key: string]: {
      valor: number;
      descricao: string;
    };
  };
}

// Dicionário de explicações para cada tipo de coeficiente
const explicacoesCoeficientes: Record<string, string> = {
  coeficiente_1: "Usado no cálculo inicial do valor base do empréstimo",
  coeficiente_2: "Aplicado na segunda fase de cálculo para ajuste de risco",
  porcentagem_1: "Percentual aplicado sobre o valor total para taxas administrativas",
  porcentagem_2: "Percentual de desconto para clientes especiais",
  // Adicione mais explicações conforme necessário
};

export function Coeficientes() {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");
  const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([]);
  const [filteredCoeficientes, setFilteredCoeficientes] = useState<Coeficiente[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newValues, setNewValues] = useState<Record<string, string>>({});

  // Carregar coeficientes da API
  useEffect(() => {
    const carregarCoeficientes = async () => {
      try {
        const response = await fetch("https://api.creditorealsf.com/coefficients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setCoeficientes(data);
      } catch (error) {
        console.error("Erro ao carregar coeficientes:", error);
      }
    };

    carregarCoeficientes();
  }, []);

  // Filtrar coeficientes quando menu ou submenu mudar
  useEffect(() => {
    if (selectedMenu && selectedSubmenu) {
      const filtrados = coeficientes.filter(
        (c) => c.menu === selectedMenu && c.submenu === selectedSubmenu
      );
      setFilteredCoeficientes(filtrados);
    } else {
      setFilteredCoeficientes([]);
    }
  }, [selectedMenu, selectedSubmenu, coeficientes]);

  // Extrair menus únicos
  const menusUnicos = [...new Set(coeficientes.map((c) => c.menu))];

  // Extrair submenus baseado no menu selecionado
  const submenusFiltrados = selectedMenu
    ? [...new Set(coeficientes.filter((c) => c.menu === selectedMenu).map((c) => c.submenu))]
    : [];

  const handleEditar = (id: string, currentValues: Record<string, { valor: number; descricao: string }>) => {
    setEditingId(id);
    // Inicializa os novos valores com os valores atuais
    const valoresIniciais: Record<string, string> = {};
    Object.entries(currentValues).forEach(([key, valueObj]) => {
      valoresIniciais[key] = valueObj.valor.toString();
    });
    setNewValues(valoresIniciais);
  };

  const handleCancelarEdicao = () => {
    setEditingId(null);
    setNewValues({});
  };

  const handleValueChange = (key: string, value: string) => {
    setNewValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const salvarAlteracoes = async (id: string) => {
    try {
      // Converter novos valores para o formato esperado
      const valoresAtualizados: Record<string, { valor: number; descricao: string }> = {};
      Object.entries(newValues).forEach(([key, value]) => {
        const valorNumerico = parseFloat(value);
        if (!isNaN(valorNumerico)) {
          // Mantém a descrição original
          const descricaoOriginal = coeficientes.find(c => c.id === id)?.value[key]?.descricao || "";
          valoresAtualizados[key] = {
            valor: valorNumerico,
            descricao: descricaoOriginal
          };
        }
      });

      const response = await fetch(
        `https://api.creditorealsf.com/coefficients/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            value: valoresAtualizados,
          }),
        }
      );

      if (response.ok) {
        // Atualizar estado local
        setCoeficientes((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  value: valoresAtualizados,
                }
              : c
          )
        );
        setEditingId(null);
        setNewValues({});
        alert("Coeficientes atualizados com sucesso!");
      } else {
        throw new Error("Erro ao atualizar coeficientes");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao atualizar coeficientes. Tente novamente.");
    }
  };

  return (
    <>
      <main className="main_equipes">
        <Menu type="admin" />
        <div className="linha"></div>

        <section className="coeficientes_section">
          <div className="equipe_equipes">
            <CalculatorTitle menu="Gerenciar Coeficientes" />

            {/* Seleção de Menu */}
            <div className="form-group">
              <label htmlFor="menu-select">Menu:</label>
              <select
                id="menu-select"
                value={selectedMenu}
                onChange={(e) => {
                  setSelectedMenu(e.target.value);
                  setSelectedSubmenu("");
                }}
                className="select-coeficiente"
              >
                <option value="">Selecione um menu</option>
                {menusUnicos.map((menu) => (
                  <option key={menu} value={menu}>
                    {menu}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção de Submenu */}
            {selectedMenu && (
              <div className="form-group">
                <label htmlFor="submenu-select">Submenu:</label>
                <select
                  id="submenu-select"
                  value={selectedSubmenu}
                  onChange={(e) => setSelectedSubmenu(e.target.value)}
                  className="select-coeficiente"
                >
                  <option value="">Selecione um submenu</option>
                  {submenusFiltrados.map((submenu) => (
                    <option key={submenu} value={submenu}>
                      {submenu}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Listagem de Coeficientes */}
            {filteredCoeficientes.length > 0 && (
              <div className="coeficientes-list">
                <h3 className="coeficientes-title">
                  {selectedMenu} - {selectedSubmenu}
                </h3>

                {filteredCoeficientes.map((coeficiente) => (
                  <div key={coeficiente.id} className="coeficiente-card">
                    {editingId === coeficiente.id ? (
                      <>
                        <div className="coeficiente-values">
                          {Object.entries(coeficiente.value).map(([key, valueObj]) => (
                            <div key={key} className="value-row">
                              {/* <label className="value-label">
                                : */}
                                <span 
                                  className="tooltip" 
                                  data-tooltip={explicacoesCoeficientes[key] || valueObj.descricao}
                                >
                                  ℹ️
                                </span>
                              {/* </label> */}
                              <Input
                                type="number"
                                value={newValues[key] || ""}
                                onChange={(e) => handleValueChange(key, e.target.value)} label={key.replace('_', ' ')}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="coeficiente-actions">
                          <OrangeButton
                            text="Salvar"
                            onClick={() => salvarAlteracoes(coeficiente.id)}
                          />
                          <button
                            className="cancel-button"
                            onClick={handleCancelarEdicao}
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="coeficiente-values">
                          {Object.entries(coeficiente.value).map(([key, valueObj]) => (
                            <div key={key} className="value-row">
                              <span className="value-label">
                                {key.replace('_', ' ')}:
                                <span 
                                  className="tooltip" 
                                  data-tooltip={explicacoesCoeficientes[key] || valueObj.descricao}
                                >
                                  ℹ️
                                </span>
                              </span>
                              <span className="value-display">{valueObj.valor}</span>
                            </div>
                          ))}
                        </div>
                        <div className="coeficiente-actions">
                          <OrangeButton
                            text="Editar"
                            onClick={() => handleEditar(coeficiente.id, coeficiente.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}