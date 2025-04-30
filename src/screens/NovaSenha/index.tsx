import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "../AlterarSenha/AlterarSenha.css";
import { useState } from "react";

export default function NovaSenha() {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleAlterarSenha() {
    if (novaSenha !== confirmarSenha) {
      alert("Senhas não coincidem");
      return;
    }

    const response = await fetch(
      "api.creditorealsf.com/auth/change/pass",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novaSenha }),
      }
    );

    if (response.status !== 200) {
      console.log("Erro ao salvar nova senha", response);
      return response;
    } else {
      console.log("Salvando nova senha");
      navigate("/sucesso", {
        state: { text: "Senha alterada com sucesso!" },
      });
    }
  }

  return (
    <>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b"
        id="home-logo"
      />
      <section className="main-alterar-senha">
        <SubmitCard
          inputs={[
            {
              label: "Nova Senha",
              type: "password",
              name: "novaSenha",
              value: novaSenha,
              onChange: (e) => {
                setNovaSenha(e.target.value);
              },
            },
            {
              label: "Confirmar Senha",
              type: "password",
              name: "confirmarSenha",
              value: confirmarSenha,
              onChange: (e) => {
                setConfirmarSenha(e.target.value);
              },
            },
          ]}
          button={<OrangeButton text="Alterar" onClick={handleAlterarSenha} />}
        />
      </section>
    </>
  );
}
