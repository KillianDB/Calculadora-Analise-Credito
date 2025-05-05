import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import axios from "axios";
import { useState } from "react";
import BackgroundFullGradient from "../../components/BackgroundFullGradient";
import "./loginScreen.css";
import {
  Button,
  VStack,
  Input,
  FormLabel,
  FormControl,
  Image,
} from "@chakra-ui/react";
import { Flex } from "antd";
import { useAppToast } from "../../utils/toaster";

export default function LoginScreen() {
  const { showToast } = useAppToast();
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      console.log("email", email);
      const response = await axios.post("https://api.creditorealsf.com/auth", {
        email,
        password,
      });

      if (response.status != 200) {
        console.error("Erro ao fazer login", response);
        showToast(
          response?.data?.message || "Credenciais inválidas", 
          "error",
          8000 // Duração maior para erros
        );
        // setError("Credenciais inválidas");
        return;
      }
      showToast("Login efetuado com sucesso!", "success");
        navigate("/calculadora");
        console.log("Login efetuado com sucesso", response);
        const { token } = response.data;
        // const user =
        await login(token);

        // if (user !== null) {
        // 		if (user.role === "admin") {
        // 			navigate("/admin/home");
        // 		} else {
        // 			navigate("/home");
        // 		}
        	navigate("/calculadora");
        // }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      showToast(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
        "error",
        8000 // Duração maior para erros
      );
      // setError("Credenciais inválidas");
    }
  };

  return (
    <>
      <BackgroundFullGradient />
      <Flex className="mainLogin">
        <Image
          width={"60vh"}
          marginBottom={"21vh"}
          src="https://firebasestorage.googleapis.com/v0/b/credito-real-financeira.appspot.com/o/logo-square.svg?alt=media&token=b0fafaf2-4dfc-47eb-9a5d-18bae8cdb814"
        />
        <form className="formLogin" onSubmit={handleLogin}>
          <h3 id="h3-login">Login</h3>
          <VStack spacing={4} width="100%" maxW="400px" mx="auto">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </FormControl>
            <Button
              borderRadius="full"
              color="white"
              bgColor="#f99401"
              size="lg"
              width="100%"
              onClick={handleLogin}
            >
              Entrar
            </Button>
            {error && <div className="error">{error}</div>}
          </VStack>
          <Link to="/redefinir-senha">Esqueceu sua senha?</Link>
        </form>
      </Flex>
    </>
  );
}
