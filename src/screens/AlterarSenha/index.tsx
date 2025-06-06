import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "./AlterarSenha.css";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function AlterarSenha() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleEnviarEmail() {
    const change = await fetch("https://api.creditorealsf.com/auth/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (change.status !== 200) {
      toast({
        title: "Erro ao enviar código",
        description: "Verifique se o email está correto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("Erro ao enviar codigo");
      return change;
    } else {
      navigate("/confirmar-codigo");
    }
  }

  return (
    <>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b"
        id="home-logo"
      />
      <section className="main-alterar-senha">
        <h2>Alterar Senha</h2>
        <SubmitCard
          inputs={[
            {
              label: "Email",
              name: "email",
              type: "email",
              value: email,
              onChange: (e) => {
                setEmail(e.target.value);
              },
            },
            // {
            // 	label: "CPF",
            // 	type: "text",
            // 	name: "cpf",
            // 	value: cpf,
            // 	onChange: (e) => {setCpf(e.target.value)},
            // },
          ]}
          button={<OrangeButton text="Confirmar" onClick={handleEnviarEmail} />}
        />
      </section>
    </>
  );
}
