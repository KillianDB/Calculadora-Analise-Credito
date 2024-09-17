import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import axios from "axios";
import { useState } from "react";
import BackgroundFullGradient from "../../components/BackgroundFullGradient";

export default function LoginScreen() {
	const navigate = useNavigate();
	const { login } = useUser();
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"https://calculadora.reallcredito.com.br/auth",
				loginData
			);

			if (response.status === 200) {
				const { token } = response.data;
				const user = await login(token);

				if (user !== null) {
					if (user.role === "admin") {
						navigate("/admin/home");
					} else {
						navigate("/home");
					}
				}
			} else {
				console.error("Erro ao fazer login", response);
			}
		} catch (error) {
			console.error("Erro ao fazer login", error);
		}
	};

	return (
		<>
			<BackgroundFullGradient />
			<main>
				<img src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814' />
				<form onSubmit={handleLogin}>
					<h3>Login</h3>
					<section>
						<label>Email</label>
						<input
							type='email'
							name='email'
							value={loginData.email}
							onChange={(e) =>
								setLoginData({
									...loginData,
									email: e.target.value,
								})
							}
						/>
					</section>
					<section>
						<label>Senha</label>
						<input
							type='password'
							name='password'
							value={loginData.password}
							onChange={(e) =>
								setLoginData({
									...loginData,
									password: e.target.value,
								})
							}
						/>
					</section>
					<button onClick={handleLogin} type='submit'>
						Entrar
					</button>
					<Link to='/redefinir-senha'>Esqueceu sua senha?</Link>
				</form>
			</main>
		</>
	);
}
