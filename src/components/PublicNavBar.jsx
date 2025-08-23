import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 24px",
      background: "#0f172a",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <div style={{ fontWeight: 700, letterSpacing: 0.5 }}>SuaEmpresa</div>

      <div style={{ display: "flex", gap: 16 }}>
        <a href="#sobre" style={{ color: "#fff", textDecoration: "none" }}>Sobre</a>
        <a href="#produtos" style={{ color: "#fff", textDecoration: "none" }}>Produtos</a>
        <a href="#valores" style={{ color: "#fff", textDecoration: "none" }}>Valores</a>
        <a href="#contato" style={{ color: "#fff", textDecoration: "none" }}>Contato</a>
      </div>

      <button
        onClick={() => navigate("/login")}
        style={{
          background: "#22c55e",
          color: "#0b172a",
          border: "none",
          padding: "8px 14px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Entrar
      </button>
    </nav>
  );
}
