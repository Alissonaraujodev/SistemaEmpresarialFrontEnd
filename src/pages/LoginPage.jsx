import LoginForm from "../components/LoginForm";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await api.post("/auth/login", { email, senha });

      // 🔹 Salva token e usuário no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 🔹 Redireciona para o Layout (que tem o NavBar)
      navigate("/");

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
