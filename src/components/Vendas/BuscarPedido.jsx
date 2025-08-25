import { useState } from "react";
import { buscarPedido } from "../../api/vendasApi";

export default function BuscarPedido({ voltar }) {
  const [pedidoId, setPedidoId] = useState("");
  const [pedido, setPedido] = useState(null);

  const handleBuscar = async () => {
    try {
      const response = await buscarPedido(pedidoId);
      setPedido(response);
    } catch (err) {
      alert("Erro ao buscar pedido");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🔍 Buscar Pedido</h2>

      <input
        type="number"
        placeholder="ID do pedido"
        value={pedidoId}
        onChange={(e) => setPedidoId(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>
      <button onClick={voltar} style={{ marginLeft: "10px" }}>⬅ Voltar</button>

      {pedido && (
        <div style={{ marginTop: "15px" }}>
          <h3>📋 Detalhes</h3>
          <p><strong>Cliente:</strong> {pedido.cliente_nome}</p>
          <p><strong>Vendedor:</strong> {pedido.vendedor_nome}</p>
          <p><strong>Status:</strong> {pedido.status_venda}</p>
          <p><strong>Pagamento:</strong> {pedido.status_pagamento}</p>
          <p><strong>Total:</strong> R$ {pedido.valor_total}</p>
        </div>
      )}
    </div>
  );
}
