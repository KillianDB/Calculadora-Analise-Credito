/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./equipes.css";
import Menu from "../../components/Menu";
import axios from "axios";
import OrangeButton from "../../components/OrangeButton";
import { Select as SelectChakra } from "chakra-react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Select,
  SimpleGrid,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";

export function Equipes() {
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [escritorio, setEscritorio] = useState([""]);
  const [telefone, setTelefone] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [role, setRole] = useState("");
  interface Membro {
    id: string;
    nome: string;
    email: string;
    status: string;
  }

  interface Equipe {
    equipe: string;
    membros: Membro[];
  }

  const [equipes, setEquipes] = useState<Equipe[]>([
    {
      equipe: "Teutônia",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Holambra",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Venancio Aires",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Estancia Velha",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Lajeado",
      membros: [
        {
          id: "3",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "4",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Sapucaia do Sul",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
    {
      equipe: "Estrela",
      membros: [
        {
          id: "1",
          nome: "João",
          email: "joao@email.com",
          status: "Ativo",
        },
        {
          id: "2",
          nome: "Maria",
          email: "maria@email.com",
          status: "Ativo",
        },
      ],
    },
  ]);

  const options = [
    { key: "1", value: "Teutônia", label: "Teutônia" },
    { key: "2", value: "Holambra", label: "Holambra" },
    { key: "3", value: "Venancio Aires", label: "Venancio Aires" },
    { key: "4", value: "Estancia Velha", label: "Estancia Velha" },
    { key: "5", value: "Lajeado", label: "Lajeado" },
    { key: "6", value: "Sapucaia do Sul", label: "Sapucaia do Sul" },
    { key: "7", value: "Estrela", label: "Estrela" },
    { key: "8", value: "Geral", label: "Geral" },
  ];
  const adicionarMembro = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    const binaryImage = imagem ? await imagem.arrayBuffer() : null;
    const base64Image = binaryImage
      ? btoa(String.fromCharCode(...new Uint8Array(binaryImage)))
      : null;
    const response = await axios.post(
      "https://api.creditorealsf.com/members/create",
      {
        name,
        email,
        telefone,
        image: base64Image,
        role,
        escritorio,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      console.error("Erro ao adicionar membro");
      alert(response);
      setAddMemberModalOpen(false);
      return;
    }
    alert(response);
    setAddMemberModalOpen(false);
    return;
  };

  const editarMembro = async (membro: { id: string }) => {
    const response = await fetch(`https://api.creditorealsf.com/members/${membro.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        // userType,
        role,
      }),
    });

    if (response.status !== 200) {
      console.error("Erro ao editar membro");
      alert(response);
      setEditMemberModalOpen(false);
      return;
    }
    alert(response);
    setEditMemberModalOpen(false);
    return;
  };

  const bloquearMembro = async (membro: { id: string }) => {
    const response = await fetch(
      `https://api.creditorealsf.com/members/block/${membro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error("Erro ao bloquear membro");
      alert(response);
      return;
    }
    alert(response);
    return;
  };

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await fetch(
          "https://api.creditorealsf.com/members/all/escritorio"
        );
        if (response.status !== 200) {
          console.error("Error fetching equipes:", response);
          setEquipes([]);
          return;
        }
        const data = await response.json();
        setEquipes(data);
      } catch (error) {
        console.error("Error fetching equipes:", error);
      }
    };
    fetchEquipes();
  }, []);

  return (
    <>
      <main className="main_equipes">
        <Menu type="admin" />
        <div className="linha"></div>
        <div className="filtros_equipes">
          <Select width={"150px"} borderRadius={"10px"} mr={4}>
            <option defaultValue="Geral">Geral</option>
            {equipes.map((equipe) => (
              <option defaultValue="Geral" value={equipe.equipe}>
                {equipe.equipe}
              </option>
            ))}
          </Select>
          <OrangeButton
            text="Adicionar membro"
            onClick={() => setAddMemberModalOpen(true)}
          />
        </div>
        <Flex w={"100vw"} justifyContent={"space-evenly"}>
          <SimpleGrid columns={3} spacingX={100} spacingY={5}>
            {equipes.map((equipe) => (
              <div className="equipe_equipes">
                <h3>{equipe.equipe}</h3>
                {equipe.membros.map((membro) => (
                  <div className="membro_equipes">
                    <h6>{membro.nome}</h6>
                    <h6>{membro.email}</h6>
                    <h6
                      style={{
                        color: membro.status === "Ativo" ? "green" : "red",
                      }}
                    >
                      {membro.status}
                    </h6>
                    <button
                      className="button_editar"
                      onClick={() => {
                        setEditMemberModalOpen(true);
                      }}
                    >
                      Editar
                    </button>
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/slash.svg?alt=media&token=d49903be-229f-4b6a-b540-c67467ed599e"
                      onClick={() =>
                        bloquearMembro({
                          id: membro.id,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </SimpleGrid>
        </Flex>
        {addMemberModalOpen && (
          <Modal
            isOpen={addMemberModalOpen}
            onClose={() => setAddMemberModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Adicionar Membro</ModalHeader>
              <ModalCloseButton onClick={() => setAddMemberModalOpen(false)} />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="lg"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                  />
                  <Box width={"100%"}>
                    <SelectChakra
                      isMulti
                      options={options}
                      value={escritorio}
                      onChange={(e: any) => setEscritorio(e)}
                      placeholder="Selecione um ou mais escritórios"
                      size="lg"
                    />
                  </Box>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Selecione um papel"
                    size="lg"
                  >
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                    <option value="operational">Operacional</option>
                    <option value="seller">Vendedor</option>
                    <option value="enterprise">Empresa Parceira</option>
                  </Select>
                  {role === "enterprise" && (
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImagem(e.target.files ? e.target.files[0] : null)
                        }
                        size="lg"
                      />
                      <Input
                        type="tel"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        size="lg"
                      />
                    </>
                  )}
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  borderRadius="full"
                  color="white"
                  bgColor="#f99401"
                  size="lg"
                  width="100%"
                  onClick={() => adicionarMembro()}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        {editMemberModalOpen && (
          <Modal
            isOpen={editMemberModalOpen}
            onClose={() => setEditMemberModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Membro</ModalHeader>
              <ModalCloseButton onClick={() => setEditMemberModalOpen(false)} />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="lg"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                  />
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Selecione um papel"
                    size="lg"
                  >
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                    <option value="operational">Operacional</option>
                    <option value="seller">Vendedor</option>
                  </Select>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  borderRadius="full"
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                  onClick={() => editarMembro}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </main>
    </>
  );
}
