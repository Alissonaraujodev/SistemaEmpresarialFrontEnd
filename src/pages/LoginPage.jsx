import LoginForm from "../components/LoginForm";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await api.post("/auth/login", { email, senha });

      // 1️⃣ Armazena o token no localStorage
      localStorage.setItem("token", response.data.token);

      // 2️⃣ Redireciona para a página principal (ex.: produtos)
      navigate("/produtos");

      alert("Login bem-sucedido!");
    } catch (error) {
      console.error("Erro ao logar:", error.response?.data || error.message);
      alert("Erro no login!");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
