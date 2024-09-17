import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import axios from "axios";
import { useState } from "react";

export default function LoginScreen() {
	const navigate = useNavigate();
	const { login } = useUser();
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"https://calculadora.reallcredito.com.br/auth/login",
				loginData
			);

			if (response.status === 200) {
				const { token } = response.data;
				login(token);
				navigate("/home");
			} else {
				console.error("Erro ao fazer login", response);
			}
		} catch (error) {
			console.error("Erro ao fazer login", error);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<input
				type='email'
				placeholder='Email'
				value={loginData.email}
				onChange={(e) =>
					setLoginData({ ...loginData, email: e.target.value })
				}
			/>
			<input
				type='password'
				placeholder='Password'
				value={loginData.password}
				onChange={(e) =>
					setLoginData({ ...loginData, password: e.target.value })
				}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
