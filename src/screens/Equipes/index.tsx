import { useEffect, useState } from "react";
import BlueButton from "../../components/BlueButton";
import Modal from "react-modal";
import "./equipes.css";
import Menu from "../../components/Menu";
import axios from "axios";
import OrangeButton from "../../components/OrangeButton";
import { Flex, Image, Select, SimpleGrid } from "@chakra-ui/react";

export function Equipes() {
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  // const [filteredEquipes, setFilteredEquipes] = useState<Equipe[]>([]);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  // 	const searchTerm = e.target.value.toLowerCase();
  // 	const filtered = equipes
  // 		.map((equipe) => {
  // 			const filteredMembros = equipe.membros.filter((membro) =>
  // 				membro.nome.toLowerCase().includes(searchTerm)
  // 			);
  // 			return {
  // 				...equipe,
  // 				membros: filteredMembros,
  // 			};
  // 		})
  // 		.filter((equipe) => equipe.membros.length > 0);
  // 	setFilteredEquipes(filtered);
  // 	return filteredEquipes;
  // };

  const adicionarMembro = async () => {
    const response = await axios.post(
      "https://calculadora.reallcredito.com.br/member",
      {
        name,
        email,
        telefone,
        imagem,
        role,
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
    const response = await fetch(
      `https://calculadora.reallcredito.com.br/member/${membro.id}`,
      {
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
      }
    );

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
      `https://calculadora.reallcredito.com.br/member/block/${membro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
          "https://calculadora.reallcredito.com.br/member/all/escritorio"
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

        {/* <section className='section_buscar'>
					<input
						type='text'
						placeholder='Buscar'
						onChange={handleSearch}
					/>
				</section> */}
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
                      onClick={() => bloquearMembro({ id: membro.id })}
                    />
                  </div>
                ))}
              </div>
            ))}
          </SimpleGrid>
        </Flex>
        {addMemberModalOpen && (
          <Modal isOpen={addMemberModalOpen} className="modalCalculator">
            <h2
              className="close-button"
              onClick={() => {
                setAddMemberModalOpen(false);
              }}
            >
              X
            </h2>
            <label>Adicionar Membro</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="operational">Operacional</option>
              <option value="seller">Vendedor</option>
              <option value="enterprise">Empresa Parceira</option>
            </Select>
            {role === "enterprise" && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImagem(e.target.files ? e.target.files[0] : null)
                  }
                />
                <input
                  type="phone"
                  placeholder="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                ></input>
              </>
            )}
            <OrangeButton text="Salvar" onClick={() => adicionarMembro} />
          </Modal>
        )}
        {editMemberModalOpen && (
          <Modal isOpen={editMemberModalOpen} className="modalCalculator">
            <h2
              className="close-button"
              onClick={() => {
                setEditMemberModalOpen(false);
              }}
            >
              X
            </h2>
            <label>Editar Membro</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="operational">Operacional</option>
              <option value="seller">Vendedor</option>
            </Select>
            <BlueButton text="Salvar" onClick={() => editarMembro} />
          </Modal>
        )}
      </main>
    </>
  );
}
