/*
mport React from "react";
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
*/

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  //const user = JSON.parse(localStorage.getItem("user")); // pega usuário salvo no login

  // ✅ só faz parse se existir user no localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // remove dados do usuário
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
      {/* Links */}
      <div>
        <Link to="/produtos" style={{ margin: "0 10px", color: "#fff" }}>Produtos</Link>
        <Link to="/clientes" style={{ margin: "0 10px", color: "#fff" }}>Clientes</Link>
        <Link to="/vendas" style={{ margin: "0 10px", color: "#fff" }}>Vendas</Link>
        <Link to="/caixa" style={{ margin: "0 10px", color: "#fff" }}>Caixa</Link>
        <Link to="/funcionarios" style={{ margin: "0 10px", color: "#fff" }}>Funcionários</Link>
        <Link to="/pagamentos" style={{ margin: "0 10px", color: "#fff" }}>Pagamentos</Link>
        <Link to="/relatorios" style={{ margin: "0 10px", color: "#fff" }}>Relatórios</Link>
      </div>

      {/* Usuário e botão de logout */}
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
