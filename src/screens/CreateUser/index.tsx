import axios from "axios";
import { useState } from "react";
import { generatePassword } from "../../utils/randomPass";
import Input from "../../components/Input";
import BlueButton from "../../components/BlueButton";
import Select from "../../components/Select";

export function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [office, setOffice] = useState("");
  // const [userType, setUserType] = useState("");
  const [role, setRole] = useState("");
  // const [cpf, setCPF] = useState(0);
  // const [address, setAddress] = useState("");

  const create = async () => {
    const password = generatePassword();
    try {
      axios.post("https://api.creditorealsf.com/members", {
        name,
        // userType,
        role,
        email,
        password,
        office,
      });
    } catch (err) {
      console.error(err);
      throw new Error(`Erro ao criar usuário, ${err}`);
    }
  };

  return (
    <form className="">
      <Input
        label="Nome Completo"
        type="text"
        onChange={(e) => setName(e.target.value)}
      ></Input>
      {/* <Input
				label='CPF'
				type='number'
				onChange={(e) => setCPF(+e.target.value)}
			></Input> */}
      <Input
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      {/* <Input
				label='Endereço'
				type='text'
				onChange={(e) => setAddress(e.target.value)}
			></Input> */}
      <label>Cargo</label>
      <Select
        options={[
          { value: "admin", label: "Administrador" },
          { value: "manager", label: "Gerente" },
          { value: "seller", label: "Vendedor" },
          { value: "operational", label: "Operacional" },
          { value: "enterprise", label: "Empresa Parceira" },
        ]}
        onChange={(e) => setRole(e.target.value)}
      ></Select>
      <label>Escritório</label>
      <Select
        options={[
          { value: "geral", label: "Geral" },
          { value: "sapucaia1", label: "Escritório Sapucaia" },
          {
            value: "estanciaVelha",
            label: "Escritório Estância Velha",
          },
          { value: "teutonia", label: "Escritório Teutônia" },
          {
            value: "bomRetiroDoSul",
            label: "Escritório Bom Retiro do Sul",
          },
          { value: "lajeado", label: "Escritório Lajeado" },
          {
            value: "venancioAires",
            label: "Escritório Venâncio Aires",
          },
        ]}
        onChange={(e) => setOffice(e.target.value)}
      ></Select>
      {/* <label>Tipo de usuário</label> */}
      {/* <Select
				options={[
					{ value: "member", label: "Equipe CR" },
					{ value: "enterprise", label: "Empresa" },
					{ value: "admin", label: "Administrador" },
				]}
				onChange={(e) => setUserType(e.target.value)}
			></Select> */}
      <BlueButton onClick={create} text="Adicionar funcionário" />
    </form>
  );
}
