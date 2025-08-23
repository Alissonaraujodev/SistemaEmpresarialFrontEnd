import { useState } from "react";
import {
  abrirPedido,
  editarItensPedido,
  liberarEdicaoPedido,
  cancelarPedido,
  buscarPedido,
} from "../api/vendasApi";

export default function VendasPage() {
  const [pedidoId, setPedidoId] = useState(null);
  const [pedidoDetalhes, setPedidoDetalhes] = useState(null);

  const handleAbrirPedido = async () => {
    try {
      const response = await abrirPedido("Cliente Teste");
      alert(response.message);
      setPedidoId(response.pedido);
    } catch (error) {
      alert("Erro ao abrir pedido");
    }
  };

  const handleBuscarPedido = async () => {
    try {
      const dados = await buscarPedido(pedidoId);
      setPedidoDetalhes(dados);
    } catch (error) {
      alert("Erro ao buscar pedido");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Gestão de Vendas</h1>

      <button onClick={handleAbrirPedido}>Abrir Pedido</button>

      {pedidoId && (
        <div style={{ marginTop: "20px" }}>
          <h2>Pedido Aberto: #{pedidoId}</h2>
          <button onClick={handleBuscarPedido}>Carregar Detalhes</button>
        </div>
      )}

      {pedidoDetalhes && (
        <div style={{ marginTop: "20px" }}>
          <h3>📋 Detalhes do Pedido</h3>
          <p><strong>Cliente:</strong> {pedidoDetalhes.cliente_nome}</p>
          <p><strong>Vendedor:</strong> {pedidoDetalhes.vendedor_nome}</p>
          <p><strong>Status Venda:</strong> {pedidoDetalhes.status_venda}</p>
          <p><strong>Status Pagamento:</strong> {pedidoDetalhes.status_pagamento}</p>
          <p><strong>Valor Total:</strong> R$ {pedidoDetalhes.valor_total}</p>
          <p><strong>Valor Pago:</strong> R$ {pedidoDetalhes.valor_pago}</p>

          <h4>Itens</h4>
          <ul>
            {pedidoDetalhes.itens_vendidos.map((item, idx) => (
              <li key={idx}>
                {item.nome_produto} - {item.quantidade}x - R$ {item.subtotal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
