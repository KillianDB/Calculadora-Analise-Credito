import "./header.css";
import { NavLink } from "react-router-dom";

function Header({ title }: { title: string }) {
	return (
		<header>
			<NavLink to='/'>Login</NavLink>
			<NavLink to='/registro'>Cadastrar usuário</NavLink>
			<h1>{title}</h1>
		</header>
	);
}

export default Header;
