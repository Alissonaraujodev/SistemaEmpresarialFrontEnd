import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CaixaPage from "./pages/CaixaPage";
import ClientesPage from "./pages/ClientesPage";
import Dashboard from "./pages/Dashboard";
import FuncionariosPage from "./pages/FuncionariosPage";
import LoginPage from "./pages/LoginPage";
import PagamentosPage from "./pages/PagamentosPage";
import ProdutosPage from "./pages/ProdutosPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import VendasPage from "./pages/VendasPage";
import HomePage from "./pages/HomePage";   
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Rota de login SEM NavBar */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔹 Rotas protegidas COM Layout (NavBar) */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="vendas" element={<VendasPage />} />
          <Route path="caixa" element={<CaixaPage />} />
          <Route path="relatorios" element={<RelatoriosPage />} />
          <Route path="funcionarios" element={<FuncionariosPage />} />
          <Route path="pagamentos" element={<PagamentosPage />} />
        </Route>

        {/* 🔹 Qualquer rota desconhecida manda para login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
