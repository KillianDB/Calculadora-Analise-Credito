import "./App.css";
// import UsersScreen from './screens/UsersScreen';
// import NotFoundScreen from './screens/NotFoundScreen';
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { CompleteAnalysis } from "./screens/CompleteAnalysis";
import { AdminHome } from "./screens/AdminHome";
import { Equipes } from "./screens/Equipes";
import ResultadoAnalise from "./screens/ResultadoAnalise";
import Calculator from "./screens/Calculator";
import { UserProvider } from "./contexts/UserContext";
import { Bancos } from "./screens/Bancos";
import { Coeficientes } from "./screens/Coeficientes";
import { Vendas } from "./screens/Vendas";
import { Perfil } from "./screens/Perfil";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { CalculatorProvider } from "./contexts/CalculatorContext";
// import { Loading } from "./screens/Loading";

function App() {
  return (
    <UserProvider>
      <CalculatorProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<LoginScreen />} />

          <Route
            path="/metricas"
            element={<ProtectedRoute children={<AdminHome />} />}
          />
          <Route
            path="/equipes"
            element={<ProtectedRoute children={<Equipes />} />}
          />
          <Route
            path="/bancos"
            element={<ProtectedRoute children={<Bancos />} />}
          />
          <Route
            path="/coeficientes"
            element={<ProtectedRoute children={<Coeficientes />} />}
          />
          <Route
            path="/analise"
            element={<ProtectedRoute children={<CompleteAnalysis />} />}
          />
          <Route
            path="/analise/resultado"
            element={<ProtectedRoute children={<ResultadoAnalise />} />}
          />

          <Route
            path="/calculadora"
            element={<ProtectedRoute children={<Calculator />} />}
          />

          <Route
            path="/vendas"
            element={<ProtectedRoute children={<Vendas />} />}
          />
          <Route
            path="/perfil"
            element={<ProtectedRoute children={<Perfil />} />}
          />
          {/* <Route path='/loading' element={<Loading />} /> */}
          {/* <Route path='*' element={<NotFoundScreen />}/> */}

          {/* Redirecionamento Padrão */}
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </CalculatorProvider>
    </UserProvider>
  );
}

export default App;
