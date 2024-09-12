import { useNavigate } from "react-router-dom";
import OrangeButton from "../../components/OrangeButton";
import SubmitCard from "../../components/SubmitCard";
import "../AlterarSenha/AlterarSenha.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

export default function CodeConfirmation() {
	const navigate = useNavigate();
	const [code, setCode] = useState("");
	const userContext = useContext(UserContext);
	if (!userContext || !userContext.user) {
		console.error("User context is not defined");
		return null;
	}
	const { user } = userContext;

	async function handleCheckCode() {
		const response = await fetch(
			"https://calculadora.reallcredito.com.br/member/validate/code",
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
					title={`Enviamos o código de verificação para o Email: ${user.email}`}
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
