import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import axios from "axios";
import { useState } from "react";
import BackgroundFullGradient from "../../components/BackgroundFullGradient";
import "./loginScreen.css";
import Input from "../../components/Input";

export default function LoginScreen() {
	const navigate = useNavigate();
	const { login } = useUser();
	// const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			console.log("email", email);
			const response = await axios.post(
				"https://calculadora.reallcredito.com.br/auth",
				{
					email,
					password,
				}
			);

			if (response.status === 200) {
				const { token } = response.data.token;
				const user = await login(token);

				if (user !== null) {
					// 		if (user.role === "admin") {
					// 			navigate("/admin/home");
					// 		} else {
					// 			navigate("/home");
					// 		}
					navigate("/calculadora");
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
			<main className='mainLogin'>
				<img
					className='loginLogoImg'
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814'
				/>
				<form className='formLogin' onSubmit={handleLogin}>
					<h3 id='h3-login'>Login</h3>
					<section>
						{/* <label>Email</label> */}
						<Input
							label='Email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</section>
					<section>
						{/* <label>Senha</label> */}
						<Input
							label='Senha'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <input
							type='password'
							name='password'
							value={loginData.password}
							onChange={(e) =>
								setLoginData({
									...loginData,
									password: e.target.value,
								})
							}
						/> */}
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
