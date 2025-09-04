import { useState } from "react";
import AbrirPedido from "../components/Vendas/AbrirPedido";
import BuscarPedido from "../components/Vendas/BuscarPedido";
import EditarPedido from "../components/Vendas/EditarPedido";
import LiberarPedido from "../components/Vendas/LiberarPedido";
import CancelarPedido from "../components/Vendas/CancelarPedido";
import RelatorioCliente from "../components/Vendas/RelatorioCliente";

export default function VendasPage() {
  const [paginaAtiva, setPaginaAtiva] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Gestão de Vendas</h1>

      {/* Menu de botões */}
      {!paginaAtiva && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={() => setPaginaAtiva("abrir")}>📂 Abrir Pedido</button>
          <button onClick={() => setPaginaAtiva("buscar")}>🔍 Buscar Pedido</button>
          <button onClick={() => setPaginaAtiva("editar")}>✏️ Editar Itens</button>
          <button onClick={() => setPaginaAtiva("liberar")}>🔓 Liberar Edição</button>
          <button onClick={() => setPaginaAtiva("cancelar")}>❌ Cancelar Pedido</button>
          <button onClick={() => setPaginaAtiva("relatorio")}>📊 Relatório por Cliente</button>
        </div>
      )}

      {/* Renderização condicional */}
      {paginaAtiva === "abrir" && <AbrirPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "buscar" && <BuscarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "editar" && <EditarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "liberar" && <LiberarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "cancelar" && <CancelarPedido voltar={() => setPaginaAtiva(null)} />}
      {paginaAtiva === "relatorio" && <RelatorioCliente voltar={() => setPaginaAtiva(null)} />}
    </div>
  );
}
