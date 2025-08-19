/*import LoginForm from "./components/LoginForm";
import api from "./api/api";

export default function LoginPage() {
  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await api.post("auth/login", { email, senha });
      console.log("Token recebido:", response.data.token);
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
}*/

import LoginForm from "../components/LoginForm";
import api from "../api/api";

export default function LoginPage() {
  const handleLogin = async ({ email, senha }) => {
    try {
      // Alterado para "/auth/login", que é o caminho real no backend
      const response = await api.post("/auth/login", { email, senha });

      console.log("Token recebido:", response.data.token);

      // Armazenando o token no localStorage para usar depois
      localStorage.setItem("token", response.data.token);

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

