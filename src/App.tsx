import "./App.css";
// import UsersScreen from './screens/UsersScreen';
// import NotFoundScreen from './screens/NotFoundScreen';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { Home } from "./screens/Home";
import { AdminHome } from "./screens/AdminHome";
import Calculator from "./screens/Calculator";
import { CalculatorIMGResult } from "./screens/CalculatorIMGResult";
// import { CreateUser } from "./screens/CreateUser";

function App() {
	return (
		<Routes>
			<Route path='/' element={<LoginScreen />} />
			<Route path='/home' element={<Home />} />
			<Route path='/admin/home' element={<AdminHome />} />
			<Route path='/calculadora' element={<Calculator />} />
			<Route
				path='/calculadora/resultado'
				element={
					<CalculatorIMGResult
						menu={"INSS"}
						submenu={"Cálculo por Margem Disponível"}
						values={[
							"Bem vinda, Maria",
							"Valor Emprestimo R$ 00000,00",
							"Valor Cartão R$ 00000,00",
							"Valor Cartão Enviado R$ 00000,00",
							"Valor Parcela Emprestimo R$ 0000,00 84x",
							"Valor Parcela Cartão R$ 0000,00 84x",
							"Valor Parcela Enviado R$ 0000,00 84x",
							"R$ 0000,00",
							"R$ 0000,00 84x",
						]}
					/>
				}
			/>
			{/* <Route path='/criar-funcionario' element={<CreateUser />} /> */}
			{/* <Route path='*' element={<NotFoundScreen />}/> */}
		</Routes>
	);
}

export default App;
