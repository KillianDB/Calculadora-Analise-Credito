import React, { createContext, useState, useEffect } from "react";

// Defina a interface do usuário (opcional, se estiver usando TypeScript)
interface User {
	email: string;
	// Adicione outras propriedades conforme necessário
}

// Defina a interface do contexto (opcional, se estiver usando TypeScript)
interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Crie o contexto com um valor padrão
export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	// Simule a obtenção de dados do usuário (você pode substituir isso por uma chamada real à API)
	useEffect(() => {
		const fetchUser = async () => {
			// Simule uma chamada à API para obter os dados do usuário
			const userData = await fetch(
				`https://calculadora.reallcredito.com.br/member/${children}`
			);
			const userJson: User = await userData.json();
			setUser(userJson);
		};

		fetchUser();
	}, [children]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
