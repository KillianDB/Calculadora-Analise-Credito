import "./App.css";
// import UsersScreen from './screens/UsersScreen';
// import NotFoundScreen from './screens/NotFoundScreen';
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { Home } from "./screens/Home";
import { AdminHome } from "./screens/AdminHome";
import { Equipes } from "./screens/Equipes";
import ResultadoAnalise from "./screens/ResultadoAnalise";
import Calculator from "./screens/Calculator";
import { UserProvider } from "./utils/UserContext";
import { Bancos } from "./screens/Bancos";
import { Coeficientes } from "./screens/Coeficientes";
import { Vendas } from "./screens/Vendas";
import { Perfil } from "./screens/Perfil";
// import { Loading } from "./screens/Loading";

function App() {
	return (
		<UserProvider>
			<Routes>
				<Route path='*' element={<LoginScreen />} />
				<Route path='/metricas' element={<AdminHome />} />
				<Route path='/equipes' element={<Equipes />} />
				<Route path='/bancos' element={<Bancos />} />
				<Route path='/coeficientes' element={<Coeficientes />} />
				<Route path='/analise' element={<Home />} />
				<Route path='/calculadora' element={<Calculator />} />
				<Route path='/vendas' element={<Vendas />} />
				<Route path='/perfil' element={<Perfil />} />
				{/* <Route path='/loading' element={<Loading />} /> */}
				<Route
					path='/resultado-analise'
					element={<ResultadoAnalise />}
				/>
				{/* <Route path='*' element={<NotFoundScreen />}/> */}
			</Routes>
		</UserProvider>
	);
}

export default App;
