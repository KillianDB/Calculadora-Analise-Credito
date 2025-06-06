import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
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
  useToast,
} from "@chakra-ui/react";
import { Flex } from "antd";

export default function LoginScreen() {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      console.log("email", email);
      const response = await axios.post("https://api.creditorealsf.com/auth", {
        email,
        password,
      });

      const { token } = response.data;
      await login(token);

      toast({
        title: "Login efetuado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      // Redireciona com base no tipo de usuário
      if (response.data.usertype === "admin") {
        console.log("Redirecionando para admin/home");
        navigate("/equipes");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      toast({
        title:
          "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
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
            {/* {error && <div className="error">{error}</div>} */}
          </VStack>
          <Link to="/redefinir-senha">Esqueceu sua senha?</Link>
        </form>
      </Flex>
    </>
  );
}
