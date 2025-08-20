import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar";

import LoginPage from "./pages/LoginPage";
import ProdutosPage from "./pages/ProdutosPage";
import ClientesPage from "./pages/ClientesPage";
import VendasPage from "./pages/VendasPage";
import CaixaPage from "./pages/CaixaPage";
import FuncionariosPage from "./pages/FuncionariosPage";
import PagamentosPage from "./pages/PagamentosPage";
import RelatoriosPage from "./pages/RelatoriosPage";

const isAuthenticated = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <Router>
      {isAuthenticated() && <Navbar />} {/* Mostra Navbar apenas se estiver logado */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/produtos" element={isAuthenticated() ? <ProdutosPage /> : <Navigate to="/login" />} />
        <Route path="/clientes" element={isAuthenticated() ? <ClientesPage /> : <Navigate to="/login" />} />
        <Route path="/vendas" element={isAuthenticated() ? <VendasPage /> : <Navigate to="/login" />} />
        <Route path="/caixa" element={isAuthenticated() ? <CaixaPage /> : <Navigate to="/login" />} />
        <Route path="/funcionarios" element={isAuthenticated() ? <FuncionariosPage /> : <Navigate to="/login" />} />
        <Route path="/pagamentos" element={isAuthenticated() ? <PagamentosPage /> : <Navigate to="/login" />} />
        <Route path="/relatorios" element={isAuthenticated() ? <RelatoriosPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
