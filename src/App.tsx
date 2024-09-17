import "./App.css";
// import UsersScreen from './screens/UsersScreen';
// import NotFoundScreen from './screens/NotFoundScreen';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { Home } from "./screens/Home";
import { AdminHome } from "./screens/AdminHome";
import Calculator from "./screens/Calculator";
import { CreateUser } from "./screens/CreateUser";
import { Equipes } from "./screens/Equipes";
import ResultadoAnalise from "./screens/ResultadoAnalise";
// import { Loading } from "./screens/Loading";

function App() {
	return (
		<Routes>
			<Route path='/' element={<LoginScreen />} />
			<Route path='/home' element={<Home />} />
			<Route path='/admin/home' element={<AdminHome />} />
			<Route path='/calculadora' element={<Calculator />} />
			<Route path='/equipes' element={<Equipes />} />
			{/* <Route path='/loading' element={<Loading />} /> */}
			<Route path='/resultado-analise' element={<ResultadoAnalise />} />
			{/* <Route path='*' element={<Calculator />} /> */}
			<Route path='/criar-funcionario' element={<CreateUser />} />
			{/* <Route path='*' element={<NotFoundScreen />}/> */}
		</Routes>
	);
}

export default App;
