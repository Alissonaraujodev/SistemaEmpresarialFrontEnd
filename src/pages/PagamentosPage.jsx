import React, { useEffect, useState } from "react";
import { getPagamentos } from "../services/PagamentosService";

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const data = await getPagamentos();
        setPagamentos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPagamentos();
  }, []);

  return (
    <div>
      <h1>Pagamentos</h1>
      <ul>
        {pagamentos.map((p) => (
          <li key={p.id}>
            Cliente: {p.cliente_nome} | Pedido: {p.pedido} | Valor: R$ {p.valor} | Status: {p.status_pagamento}
          </li>
        ))}
      </ul>
    </div>
  );
}
