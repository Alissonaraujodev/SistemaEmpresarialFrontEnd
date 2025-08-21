import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não tiver token, redireciona para a página de login
    return <Navigate to="/login" replace/>;
  }

  // Se tiver token, permite acessar a rota
  return children;
}
