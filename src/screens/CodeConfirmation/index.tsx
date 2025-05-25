import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "../AlterarSenha/AlterarSenha.css";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";

export default function CodeConfirmation() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useUser();

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Verificação adicional de segurança
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "https://api.creditorealsf.com/auth",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Falha na verificação do usuário");
        }

      } catch (error) {
        console.error("Erro na verificação:", error);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [user, navigate, logout]);

  async function handleCheckCode() {
    try {
      setError("");
      const response = await axios.post(
        "https://api.creditorealsf.com/auth/validate/code",
        { code },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/nova-senha");
      }
    } catch (error) {
      setError("Código inválido ou expirado");
      console.error("Erro na verificação:", error);
    }
  }

  if (loading) {
    return <div className="loading">Verificando autenticação...</div>;
  }

  return (
    <div className="code-confirmation-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b"
        alt="Logo Credito Real"
        className="logo"
      />

      <main className="main-content">
        <SubmitCard
          title={`Enviamos o código de verificação para: ${user?.email || ""}`}
          inputs={[
            {
              label: "Digite o código enviado abaixo",
              type: "text",
              name: "code",
              value: code,
              onChange: (e) => setCode(e.target.value),
            },
          ]}
          button={
            <>
              {error && <div className="error-message">{error}</div>}
              <OrangeButton 
                text="Confirmar" 
                onClick={handleCheckCode}
                // disabled={!code.trim()}
              />
            </>
          }
        />
      </main>
    </div>
  );
}