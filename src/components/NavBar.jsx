import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Erro ao parsear user do localStorage:", e);
    localStorage.removeItem("user"); // limpa dado corrompido
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#282c34",
      color: "#fff"
    }}>
      <div>
        <Link to="/app/produtos" style={{ margin: "0 10px", color: "#fff" }}>Produtos</Link>
        <Link to="/app/clientes" style={{ margin: "0 10px", color: "#fff" }}>Clientes</Link>
        <Link to="/app/vendas" style={{ margin: "0 10px", color: "#fff" }}>Vendas</Link>
        <Link to="/app/caixa" style={{ margin: "0 10px", color: "#fff" }}>Caixa</Link>
        <Link to="/app/funcionarios" style={{ margin: "0 10px", color: "#fff" }}>Funcionários</Link>
        <Link to="/app/pagamentos" style={{ margin: "0 10px", color: "#fff" }}>Pagamentos</Link>
        <Link to="/app/relatorios" style={{ margin: "0 10px", color: "#fff" }}>Relatórios</Link>
      </div>

      <div>
        {user && <span style={{ marginRight: "15px" }}>👤 {user.email}</span>}
        <button
          onClick={handleLogout}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
