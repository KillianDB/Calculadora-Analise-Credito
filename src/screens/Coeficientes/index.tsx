import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Badge,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  IconButton,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  InfoOutlineIcon,
  EditIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import Menu from "../../components/Menu";

interface Coeficiente {
  id: string;
  menu: string;
  submenu: string;
  value: {
    [key: string]: number;
  };
}

const explicacoesCoeficientes: Record<string, string> = {
  coeficiente_valor_liberado: "O valor que será liberado para o cliente",
  coeficiente_emprestimo: "Taxa de juros aplicada ao empréstimo",
  coeficiente_cartao_inss: "Valor aplicado ao cartão INSS",
  porcentagem_margem_emprestimo:
    "Percentual da margem disponível para empréstimo",
  // Adicione mais descrições conforme necessário
};

export function Coeficientes() {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");
  const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([]);
  const [filteredCoeficientes, setFilteredCoeficientes] = useState<
    Coeficiente[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newValues, setNewValues] = useState<Record<string, string>>({});
  const [menus, setMenus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  // Use o contexto da calculadora para obter parâmetros
  const parameters = localStorage.getItem("calculatorParams");

  // Carregar coeficientes da localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        console.log("Carregando coeficientes...");

        // Tente carregar do contexto primeiro
        let params;
        if (parameters) {
          try {
            // Se parameters for uma string, tenta fazer parse para objeto
            params =
              typeof parameters === "string"
                ? JSON.parse(parameters)
                : parameters;
            console.log("Carregado do contexto:", params);
          } catch (e) {
            console.error("Erro ao fazer parse dos parâmetros do contexto:", e);
            params = null;
          }
        }

        // Fallback para localStorage se params não for válido
        if (!params || Object.keys(params).length === 0) {
          const paramsString = localStorage.getItem("calculatorParams");
          if (!paramsString) {
            throw new Error("Parâmetros não encontrados");
          }
          params = JSON.parse(paramsString);
          console.log("Carregado do localStorage:", params);
        }

        if (!params || Object.keys(params).length === 0) {
          throw new Error("Parâmetros vazios");
        }

        const coeficientesArray: Coeficiente[] = [];
        const menusArray: string[] = [];

        // Itera sobre os menus (INSS, LOAS REP LEGAL, PREFEITURA, EXERCITO)
        for (const menu of Object.keys(params)) {
          console.log("Processando menu:", menu);
          menusArray.push(menu);

          // Itera sobre os submenus de cada menu
          const submenus = params[menu];
          for (const submenu of Object.keys(submenus)) {
            console.log("Processando submenu:", submenu);
            const submenuData = submenus[submenu];

            // Verifica se o submenuData tem a estrutura esperada (id e values)
            if (submenuData && submenuData.id && submenuData.values) {
              coeficientesArray.push({
                id: submenuData.id,
                menu,
                submenu,
                value: submenuData.values as Record<string, number>,
              });
            } else {
              console.warn(
                `Estrutura inválida para submenu ${submenu} no menu ${menu}:`,
                submenuData
              );
            }
          }
        }

        console.log("Coeficientes carregados:", coeficientesArray);
        console.log("Menus carregados:", menusArray);

        setCoeficientes(coeficientesArray);
        setMenus(menusArray);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setIsLoading(false);
      }
    };

    loadData();
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

  // Extrair submenus baseado no menu selecionado
  const submenusFiltrados = selectedMenu
    ? [
        ...new Set(
          coeficientes
            .filter((c) => c.menu === selectedMenu)
            .map((c) => c.submenu)
        ),
      ]
    : [];

  const handleEditar = (id: string, currentValues: Record<string, number>) => {
    setEditingId(id);
    const valoresIniciais: Record<string, string> = {};
    Object.entries(currentValues).forEach(([key, value]) => {
      valoresIniciais[key] = value.toString();
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
      const valoresAtualizados: Record<string, number> = {};
      Object.entries(newValues).forEach(([key, value]) => {
        const valorNumerico = parseFloat(value);
        if (!isNaN(valorNumerico)) {
          valoresAtualizados[key] = valorNumerico;
        }
      });
      console.log("Valores atualizados: ", valoresAtualizados);

      const coeficiente = coeficientes.find((c) => c.id === id);
      if (!coeficiente) throw new Error("Coeficiente não encontrado");
      console.log("Coeficiente encontrado: ", coeficiente);
      const token = localStorage.getItem("token");

      // Aqui você faria a chamada à API real
      console.log("Dados que serião enviados:", {
        menu: coeficiente.menu,
        submenu: coeficiente.submenu,
        value: valoresAtualizados,
      });

      const response = await axios.put(
        `https://api.creditorealsf.com/coefficients/${id}`,
        {
          menu: coeficiente.menu,
          submenu: coeficiente.submenu,
          value: valoresAtualizados,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Simulando uma resposta bem-sucedida
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

        toast({
          title: "Sucesso",
          description: "Coeficientes atualizados com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      toast({
        title: "Erro",
        description:
          err instanceof Error ? err.message : "Erro ao atualizar coeficientes",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Flex minH="100vh">
        <Menu type="admin" />
        <Box
          flex="1"
          p={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh">
        <Menu type="admin" />
        <Box flex="1" p={8}>
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex h="100vh">
      <main className="body_colaborators">
        <Menu type="admin" />
        <div className="linha"></div>
        <div className="divMenus"></div>

        <div
          className="mainCalculator"
          style={{
            height: "77vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Flex direction="column" gap={6}>
            <Flex className="divMenus" width="100%" gap={4}>
              <select
                title="Menu"
                value={selectedMenu}
                onChange={(e) => {
                  setSelectedMenu(e.target.value);
                  setSelectedSubmenu("");
                }}
                style={{ minWidth: "200px" }}
              >
                <option value="">Menu</option>
                {menus.map((menu) => (
                  <option key={menu} value={menu}>
                    {menu}
                  </option>
                ))}
              </select>

              <select
                title="Submenu"
                value={selectedSubmenu}
                onChange={(e) => setSelectedSubmenu(e.target.value)}
                disabled={!selectedMenu}
                style={{ minWidth: "200px" }}
              >
                <option value="">Submenu</option>
                {submenusFiltrados.map((submenu) => (
                  <option key={submenu} value={submenu}>
                    {submenu}
                  </option>
                ))}
              </select>
            </Flex>

            {filteredCoeficientes.length > 0 && (
              <Box h="54vh" overflowY="auto">
                {filteredCoeficientes.map((coeficiente) => (
                  <Card key={coeficiente.id} mb={6} variant="outline">
                    <CardBody p={0}>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Chave</Th>
                            <Th>Valor</Th>
                            <Th>Descrição</Th>
                            <Flex justify="space-between" align="center">
                              {editingId === coeficiente.id ? (
                                <Flex gap={2}>
                                  <IconButton
                                    aria-label="Salvar alterações"
                                    icon={<CheckIcon />}
                                    colorScheme="green"
                                    onClick={() =>
                                      salvarAlteracoes(coeficiente.id)
                                    }
                                    width="40px"
                                  />
                                  <IconButton
                                    aria-label="Cancelar edição"
                                    icon={<CloseIcon />}
                                    onClick={handleCancelarEdicao}
                                    width="40px"
                                  />
                                </Flex>
                              ) : (
                                <IconButton
                                  aria-label="Editar coeficientes"
                                  icon={<EditIcon />}
                                  backgroundColor="white"
                                  onClick={() =>
                                    handleEditar(
                                      coeficiente.id,
                                      coeficiente.value
                                    )
                                  }
                                  width="40px"
                                />
                              )}
                            </Flex>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {Object.entries(coeficiente.value).map(
                            ([key, value]) => (
                              <Tr key={key}>
                                <Td>
                                  <Flex align="center">
                                    {key.replace("_", " ")}
                                    <Tooltip
                                      label={
                                        explicacoesCoeficientes[key] || key
                                      }
                                      placement="top"
                                      hasArrow
                                    >
                                      <InfoOutlineIcon
                                        ml={2}
                                        color="grey.500"
                                      />
                                    </Tooltip>
                                  </Flex>
                                </Td>
                                <Td>
                                  {editingId === coeficiente.id ? (
                                    <NumberInput
                                      value={newValues[key] || ""}
                                      onChange={(valueString) =>
                                        handleValueChange(key, valueString)
                                      }
                                      precision={4}
                                      step={0.0001}
                                      min={0}
                                      width="150px"
                                    >
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        {/* <NumberIncrementStepper />
                                        <NumberDecrementStepper /> */}
                                      </NumberInputStepper>
                                    </NumberInput>
                                  ) : (
                                    <Badge
                                      colorScheme={
                                        key.includes("porcentagem")
                                          ? "green"
                                          : "blue"
                                      }
                                      fontSize="md"
                                      px={3}
                                      py={1}
                                      borderRadius="full"
                                    >
                                      {value}
                                      {key.includes("porcentagem") && "%"}
                                    </Badge>
                                  )}
                                </Td>
                                <Td>
                                  <Text fontSize="sm" color="gray.600">
                                    {explicacoesCoeficientes[key] || key}
                                  </Text>
                                </Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>
                ))}
              </Box>
            )}

            {selectedMenu &&
              selectedSubmenu &&
              filteredCoeficientes.length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  Nenhum coeficiente encontrado para este menu/submenu
                </Alert>
              )}
          </Flex>
        </div>
      </main>
    </Flex>
  );
}
