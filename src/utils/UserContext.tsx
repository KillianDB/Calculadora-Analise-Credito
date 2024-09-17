import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface User {
	token: string;
	id?: string;
	name?: string;
	email?: string;
	role?: string;
	userType?: string;
}

interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: (token: string) => User | null;
	logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(() => {
		const token = localStorage.getItem("token");
		return token ? { token } : null;
	});

	useEffect(() => {
		const fetchUser = async () => {
			if (user && user.token) {
				try {
					const response = await axios.get(
						"https://calculadora.reallcredito.com.br/auth",
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					);
					if (response.status === 200) {
						const userData = response.data;
						console.log("User data:", userData);
						setUser({ token: user.token, ...userData });
						return userData;
					} else {
						console.error("Erro ao verificar usuário", response);
						logout();
					}
				} catch (error) {
					console.error("Erro ao verificar usuário", error);
					logout();
				}
			}
		};

		fetchUser();
	}, [user]);

	const login = (token: string): User | null => {
		localStorage.setItem("token", token);
		const newUser = { token };
		setUser(newUser);
		return newUser;
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, setUser, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to use the UserContext
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
