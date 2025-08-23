import LoginForm from "../components/LoginForm";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const { data } = await api.post("/auth/login", { email, senha });

      // IMPORTANTE: seu backend retorna "funcionario"
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.funcionario));

      navigate("/app/dashboard"); // vai para a área logada
    } catch (error) {
      console.error("Erro ao logar:", error.response?.data || error.message);
      alert("Erro no login!");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />

      {/* 🔹 Botão para voltar à página inicial */}
      <p style={{ marginTop: "15px" }}>
        <Link to="/">← Voltar para a página inicial</Link>
      </p>
    </div>
  );
}