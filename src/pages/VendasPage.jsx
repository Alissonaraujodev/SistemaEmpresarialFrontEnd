import { useState } from "react";
import AbrirPedido from "../components/Vendas/AbrirPedido";
import BuscarPedido from "../components/vendas/BuscarPedido";
import EditarPedido from "../components/vendas/EditarPedido";
import LiberarPedido from "../components/vendas/LiberarPedido";
import CancelarPedido from "../components/vendas/CancelarPedido";

export default function VendasPage() {
  const [paginaAtiva, setPaginaAtiva] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Gestão de Vendas</h1>

      {/* Menu de botões */}
      {!paginaAtiva && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => setPaginaAtiva("abrir")}>📂 Abrir Pedido</button>
          <button onClick={() => setPaginaAtiva("buscar")}>🔍 Buscar Pedido</button>
          <button onClick={() => setPaginaAtiva("editar")}>✏️ Editar Itens</button>
          <button onClick={() => setPaginaAtiva("liberar")}>🔓 Liberar Edição</button>
          <button onClick={() => setPaginaAtiva("cancelar")}>❌ Cancelar Pedido</button>
        </div>
      )}

      {/* Renderização condicional */}
      {paginaAtiva === "abrir" && <AbrirPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "buscar" && <BuscarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "editar" && <EditarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "liberar" && <LiberarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "cancelar" && <CancelarPedido voltar={() => setPaginaAtiva(null)} />}
    </div>
  );
}
