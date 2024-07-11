// import React, { useState } from "react";
// import "./loginScreen.css";
// import { auth } from "../../config/firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

// interface LoginState {
// 	email: string;
// 	password: string;
// }

// export function LoginScreen() {
// 	const [credentials, setCredentials] = useState<LoginState>({
// 		email: "",
// 		password: "",
// 	});

// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	const [signInWithEmailAndPassword, user, loading, error] =
// 		useSignInWithEmailAndPassword(auth);

// 	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setCredentials({
// 			...credentials,
// 			[event.target.name]: event.target.value,
// 		});
// 	};

// 	const navigate = useNavigate();

// 	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		try {
// 			await signInWithEmailAndPassword(
// 				credentials.email,
// 				credentials.password
// 			);
// 			// Handle successful login (optional)
// 			if (
// 				credentials.email == "creditorreal@gmail.com" ||
// 				credentials.email == "admin@email.com"
// 			) {
// 				navigate("/admin/home");
// 			} else {
// 				navigate("/home");
// 			}
// 		} catch (error) {
// 			console.error("Authentication Error:", error);
// 		} finally {
// 			setCredentials({ email: "", password: "" });
// 		}
// 	};

// 	return (
// 		<>
// 			<main>
// 				<img src='/logo-square.svg' />
// 				<form onSubmit={handleSubmit}>
// 					<h3>Login</h3>
// 					<section>
// 						<label>Email</label>
// 						<input
// 							type='email'
// 							name='email'
// 							value={credentials.email}
// 							onChange={handleChange}
// 						/>
// 					</section>
// 					<section>
// 						<label>Senha</label>
// 						<input
// 							type='password'
// 							name='password'
// 							value={credentials.password}
// 							onChange={handleChange}
// 						/>
// 					</section>
// 					<button type='submit'>Entrar</button>
// 					<Link to='/redefinir-senha'>Esqueceu sua senha?</Link>
// 				</form>
// 			</main>
// 		</>
// 	);
// }
