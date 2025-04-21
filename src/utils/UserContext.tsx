import React, { createContext, useState, useContext, useEffect } from "react";
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
  login: (token: string) => Promise<User | null>;
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
    console.log("User state updated:", user);
  }, [user]);

  const login = async (token: string): Promise<User | null> => {
    console.log("Token:", token);
    localStorage.setItem("token", token);
    const newUser = { token };
    console.log("New user:", newUser);
    setUser(newUser);
    console.log("User:", user);
    try {
      const response = await axios.get("api.creditorealsf.com/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userData = response.data;
        console.log("User data:", userData);
        setUser({ token, ...userData });
        console.log("User with data:", user);
        return userData;
      } else {
        console.error("Erro ao verificar usuário", response);
        logout();
      }
    } catch (error) {
      console.error("Erro ao verificar usuário", error);
      logout();
    }
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
