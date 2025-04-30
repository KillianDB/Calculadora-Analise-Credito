// UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
  userType: string;
}

interface UserContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificação inicial ao carregar o app
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return navigate("/login");
      }

      try {
        const response = await axios.get("https://api.creditorealsf.com/auth", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser({ token, ...response.data });
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (token: string) => {
    try {
      localStorage.setItem("token", token);
      
      const response = await axios.get("https://api.creditorealsf.com/auth", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = { token, ...response.data };
      setUser(userData);
      navigate("/"); // Redireciona para a página principal após login
    } catch (error) {
      console.error("Falha no login:", error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
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