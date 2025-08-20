import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#282c34", color: "#fff" }}>
      <Link to="/produtos" style={{ margin: "0 10px", color: "#fff" }}>Produtos</Link>
      <Link to="/clientes" style={{ margin: "0 10px", color: "#fff" }}>Clientes</Link>
      <Link to="/vendas" style={{ margin: "0 10px", color: "#fff" }}>Vendas</Link>
      <Link to="/caixa" style={{ margin: "0 10px", color: "#fff" }}>Caixa</Link>
      <Link to="/funcionarios" style={{ margin: "0 10px", color: "#fff" }}>Funcionários</Link>
      <Link to="/pagamentos" style={{ margin: "0 10px", color: "#fff" }}>Pagamentos</Link>
      <Link to="/relatorios" style={{ margin: "0 10px", color: "#fff" }}>Relatórios</Link>
      <button onClick={handleLogout} style={{ marginLeft: "20px" }}>Logout</button>
    </nav>
  );
}
