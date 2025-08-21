
/*
import { Outlet, Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // usuário salvo no login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {// NavBar }
      <nav style={{ 
        padding: "10px", 
        background: "#2c3e50", 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        color: "white"
      }}>
        
        {// Links da esquerda }
        <div>
          <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>Dashboard</Link>
          <Link to="/produtos" style={{ margin: "0 10px", color: "white" }}>Produtos</Link>
          <Link to="/clientes" style={{ margin: "0 10px", color: "white" }}>Clientes</Link>
          <Link to="/vendas" style={{ margin: "0 10px", color: "white" }}>Vendas</Link>
          <Link to="/caixa" style={{ margin: "0 10px", color: "white" }}>Caixa</Link>
          <Link to="/relatorios" style={{ margin: "0 10px", color: "white" }}>Relatórios</Link>
          <Link to="/funcionarios" style={{ margin: "0 10px", color: "white" }}>Funcionários</Link>
          <Link to="/pagamentos" style={{ margin: "0 10px", color: "white" }}>Pagamentos</Link>
        </div>

        {// Usuário e botão de logout *}
        <div>
          {user && <span style={{ marginRight: "15px" }}>👤 {user.email}</span>}
          <button 
            onClick={handleLogout} 
            style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "5px" }}
          >
            Sair
          </button>
        </div>
      </nav>

      {//* Conteúdo da página *}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
*/

//import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      {/* 🔹 Navbar só aparece aqui */}
      <Navbar />
      <main style={{ padding: "20px" }}>
       <main>{children}</main>
      </main>
    </div>
  );
}