import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "../AlterarSenha/AlterarSenha.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";

export default function CodeConfirmation() {
	const navigate = useNavigate();
	const [code, setCode] = useState("");
	const userContext = useContext(UserContext);
	const [userData, setUserData] = useState({
		id: "",
		name: "",
		email: "",
		role: "",
		userType: "",
	});

	useEffect(() => {
		if (!userContext || !userContext.user) {
			console.error("User context is not defined");
			navigate("/login");
			return;
		}

		const { user } = userContext;

		axios
			.get("https://calculadora.reallcredito.com.br/auth", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((response) => {
				if (response.status !== 200) {
					console.error("Erro ao verificar usuário", response);
					navigate("/login");
				} else {
					setUserData(response.data);
				}
			})
			.catch((error) => {
				console.error("Erro ao verificar usuário", error);
				navigate("/login");
			});
	}, [userContext, navigate]);

	async function handleCheckCode() {
		const response = await fetch(
			"https://calculadora.reallcredito.com.br/auth/validate/code",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
			}
		);

		if (response.status !== 200) {
			console.log("Erro ao verificar código", response);
			return response;
		} else {
			navigate("/nova-senha");
		}
	}

	return (
		<>
			<img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='home-logo'
			/>

			<section className='main-alterar-senha'>
				<SubmitCard
					title={`Enviamos o código de verificação para o Email: ${userData.email}`}
					inputs={[
						{
							label: "Digite o código enviado abaixo",
							type: "text",
							name: "code",
							value: code,
							onChange: (e) => setCode(e.target.value),
						},
					]}
					button={
						<OrangeButton
							text='Confirmar'
							onClick={handleCheckCode}
						/>
					}
				/>
			</section>
		</>
	);
}
