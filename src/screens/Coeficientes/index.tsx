import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Badge,
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
import { useCalculatorParams } from "../../contexts/CalculatorContext";

interface Coeficiente {
  id: string;
  menu: string;
  submenu: string;
  values: {
    [key: string]: {
      description: string;
      value: number;
    };
  };
}

export function Coeficientes() {
  const {
    parameters,
    loading: contextLoading,
    loadParameters,
  } = useCalculatorParams();
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");
  const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([]);
  const [filteredCoeficientes, setFilteredCoeficientes] = useState<
    Coeficiente[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newValues, setNewValues] = useState<
    Record<string, { value: string; description: string }>
  >({});
  const [menus, setMenus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Carregar coeficientes quando os parâmetros do contexto mudarem
  useEffect(() => {
    if (!contextLoading) {
      const loadData = () => {
        try {
          console.log("Carregando coeficientes do contexto...");

          if (!parameters || Object.keys(parameters).length === 0) {
            throw new Error("Parâmetros vazios no contexto");
          }

          const coeficientesArray: Coeficiente[] = [];
          const menusArray: string[] = [];

          Object.entries(parameters).forEach(([menu, submenus]) => {
            menusArray.push(menu);

            Object.entries(submenus as Record<string, any>).forEach(
              ([submenu, submenuData]) => {
                if (submenuData && submenuData.id && submenuData.values) {
                  const valuesObj: Record<
                    string,
                    { description: string; value: number }
                  > = {};

                  submenuData.values.forEach((item: any) => {
                    if (item && item.key && item.value !== undefined) {
                      valuesObj[item.key] = {
                        description: item.description || "",
                        value: item.value,
                      };
                    }
                  });

                  coeficientesArray.push({
                    id: submenuData.id,
                    menu,
                    submenu,
                    values: valuesObj,
                  });
                }
              }
            );
          });

          setCoeficientes(coeficientesArray);
          setMenus(menusArray);
          setIsLoading(false);
        } catch (err) {
          console.error("Erro ao carregar coeficientes:", err);
          toast({
            title: "Erro ao carregar coeficientes",
            description:
              err instanceof Error ? err.message : "Erro desconhecido",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setIsLoading(false);
        }
      };

      loadData();
    }
  }, [parameters, contextLoading]);

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

  const handleEditar = (
    id: string,
    currentValues: Record<string, { description: string; value: number }>
  ) => {
    // Salvar posição atual do scroll
    if (tableRef.current) {
      scrollPositionRef.current = tableRef.current.scrollTop;
    }

    setEditingId(id);
    const valoresIniciais: Record<
      string,
      { value: string; description: string }
    > = {};
    Object.entries(currentValues).forEach(([key, val]) => {
      valoresIniciais[key] = {
        value: val.value.toString(),
        description: val.description,
      };
    });
    setNewValues(valoresIniciais);

    // Restaurar scroll após atualização do DOM
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollTop = scrollPositionRef.current;
      }
    }, 0);
  };

  const handleCancelarEdicao = () => {
    setEditingId(null);
    setNewValues({});
  };

  const handleValueChange = (
    key: string,
    field: "value" | "description",
    newValue: string
  ) => {
    setNewValues((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: newValue,
      },
    }));
  };

  const salvarAlteracoes = async (id: string) => {
    try {
      setIsLoading(true);
      const coeficiente = coeficientes.find((c) => c.id === id);
      if (!coeficiente) throw new Error("Coeficiente não encontrado");

      // Preparar os valores atualizados
      const novosValores: Record<
        string,
        { value: number; description: string }
      > = {};
      Object.entries(coeficiente.values).forEach(([key, val]) => {
        const novoValor =
          newValues[key]?.value !== undefined
            ? parseFloat(newValues[key].value)
            : val.value;
        const novaDescricao =
          newValues[key]?.description !== undefined
            ? newValues[key].description
            : val.description;

        novosValores[key] = {
          value: novoValor,
          description: novaDescricao,
        };
      });

      // Chamada à API para atualizar
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.creditorealsf.com/coefficients/${id}`,
        {
          menu: coeficiente.menu,
          submenu: coeficiente.submenu,
          values: novosValores,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // 1. Atualizar estado local imediatamente para melhor UX
        setCoeficientes((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  values: novosValores,
                }
              : c
          )
        );

        // 2. Recarregar dados do servidor para garantir sincronização
        await loadParameters();

        // 3. Resetar estado de edição
        setEditingId(null);
        setNewValues({});

        toast({
          title: "Sucesso",
          description: "Coeficientes atualizados com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
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
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
              <Flex
                flexDirection="column"
                align="center"
                justify="center"
                mt={10}
              >
                <Spinner size="xl" />
                <Text ml={4} fontSize="xl" color="gray.500">
                  Recarregando coeficientes...
                </Text>
              </Flex>
            </Flex>
          </div>
        </main>
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
              <Box h="54vh" overflowY="auto" ref={tableRef}>
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
                                      coeficiente.values
                                    )
                                  }
                                  width="40px"
                                />
                              )}
                            </Flex>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {Object.entries(coeficiente.values).map(
                            ([key, val]) => (
                              <Tr key={key}>
                                <Td>
                                  <Flex align="center">
                                    {key.replace("_", " ")}
                                    <Tooltip
                                      label={val.description || "Sem descrição"}
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
                                    <Input
                                      type="number"
                                      value={
                                        newValues[key]?.value ||
                                        val.value.toString()
                                      }
                                      onChange={(e) =>
                                        handleValueChange(
                                          key,
                                          "value",
                                          e.target.value
                                        )
                                      }
                                      step="any"
                                      min={0}
                                      width="150px"
                                    />
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
                                      {val.value}
                                      {key.includes("porcentagem") &&
                                        ` (${val.value * 100}%)`}
                                    </Badge>
                                  )}
                                </Td>
                                <Td>
                                  {editingId === coeficiente.id ? (
                                    <Input
                                      value={
                                        newValues[key]?.description ||
                                        val.description
                                      }
                                      onChange={(e) =>
                                        handleValueChange(
                                          key,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                      width="100%"
                                    />
                                  ) : (
                                    <Text fontSize="sm" color="gray.600">
                                      {val.description || "Sem descrição"}
                                    </Text>
                                  )}
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
          </Flex>
        </div>
      </main>
    </Flex>
  );
}
