import { useLocation, useNavigate } from "react-router-dom";
import "./Sucesso.css";

interface SucessoProps {
	text: string;
}

export default function Sucesso() {
	const navigate = useNavigate();
	const location = useLocation();
	const { text } = location.state as SucessoProps;

	const redirectToNextPage = () => {
		if (text === "Senha alterada com sucesso!") {
			navigate("/");
		}
	};

	setTimeout(redirectToNextPage, 1200);

	return (
		<>
			<img
				src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-comprido.svg?alt=media&token=135c3133-5dad-40be-a694-c2a143de847b'
				id='sucesso-logo'
			/>
			<section className='main-sucesso'>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/sucesso.svg?alt=media&token=d9a8fbca-eb15-4ff5-a49a-139c856ba552'
					alt='Sucesso'
					id='sucesso'
				/>
				<button id='sucesso-button'>{text}</button>
			</section>
		</>
	);
}
