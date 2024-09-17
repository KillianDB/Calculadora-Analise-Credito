import React, { createContext, useState, useEffect, useContext } from "react";

interface User {
	token: string;
}

interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: (token: string) => void;
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
		console.log("useEffect to get user data");
		const fetchUser = async () => {
			if (user && user.token) {
				try {
					console.log("user has token, fetching user data");
					const response = await fetch(
						"https://calculadora.reallcredito.com.br/auth",
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					);
					if (response.ok) {
						const userData = await response.json();
						console.log("User data:", userData);
						setUser({ token: user.token, ...userData });
						console.log("user: ", user);
					} else {
						logout();
					}
				} catch (error) {
					console.error("Failed to fetch user data:", error);
					logout();
				}
			}
		};

		fetchUser();
	}, [user]);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		setUser({ token });
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

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
