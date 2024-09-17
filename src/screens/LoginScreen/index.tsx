import React, { useState } from "react";
import "./loginScreen.css";
import { Link, useNavigate } from "react-router-dom";
import BackgroundFullGradient from "../../components/BackgroundFullGradient";
import axios from "axios";

export function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const login = await axios.post(
				"https://calculadora.reallcredito.com.br/auth",
				{
					email,
					password,
				}
			);

			if (login.status !== 200) {
				console.error("Erro ao logar");
				return login;
			}

			if (login.data.role === "admin") {
				// navigate("/admin/home");
				navigate("/calculadora");
			} else {
				navigate("/home");
			}
		} catch (error) {
			console.error("Authentication Error:", error);
		} finally {
			setEmail("");
			setPassword("");
		}
	};

	return (
		<>
			<BackgroundFullGradient />
			<main>
				<img src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814' />
				<form onSubmit={handleSubmit}>
					<h3>Login</h3>
					<section>
						<label>Email</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</section>
					<section>
						<label>Senha</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</section>
					<button type='submit'>Entrar</button>
					<Link to='/redefinir-senha'>Esqueceu sua senha?</Link>
				</form>
			</main>
		</>
	);
}
