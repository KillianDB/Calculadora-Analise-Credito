import OrangeButton from "../../components/OrangeButton";
import ResultadoAnaliseComponente from "../../components/ResultadoAnalise";
import "./style.css";
import {
  // useLocation,
  useNavigate,
} from "react-router-dom";

export default function ResultadoAnalise() {
  // const location = useLocation();
  // const responseData = location.state;
  const responseData = [
    {
      banco: "Crefaz",
      tipo: "Crédito Pessoal",
      analise: true,
      link: "https://www.crefaz.com.br/",
    },
    {
      banco: "Via Certa",
      tipo: "Crédito Pessoal",
      analise: true,
      link: "https://acerta-sistema-dev.web.app/",
    },
    {
      banco: "Crédito Real",
      tipo: "FGTS",
      analise: true,
      link: "https://www.creditoreal.com.br/",
    },
  ];
  const navigate = useNavigate();

  function handleObtainCredit(link: string) {
    window.open(link, "_blank");
  }

  return (
    <>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/seta-voltar.svg?alt=media&token=cf46113a-32c9-4f5d-a2bb-7c0047289d63"
          className="seta-voltar"
          onClick={() => navigate(-1)}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b"
          id="result-logo"
        />
      </div>
      {responseData ? (
        <div className="resultAnalisis-main-div-empty">
          <h1>Resultado da análise</h1>
          <div className="resultAnalisis-main-div">
            {responseData.map(
              (response: {
                banco: string;
                tipo: string;
                analise: boolean;
                link: string;
              }) => (
                <ResultadoAnaliseComponente
                  title={response.banco}
                  subtitle={response.tipo}
                  values={response.analise}
                  button={
                    <OrangeButton
                      text="Obter"
                      onClick={() => handleObtainCredit(response.link)}
                    />
                  }
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="resultAnalisis-main-div-empty">
          <h1>Resultado da análise</h1>
          <p>Não há resultados para exibir</p>
        </div>
      )}
    </>
  );
}
