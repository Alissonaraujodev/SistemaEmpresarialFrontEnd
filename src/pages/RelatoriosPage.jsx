import React, { useEffect, useState } from "react";
import { getRelatorioVendas } from "../services/RelatoriosService";

export default function RelatoriosPage() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const data = await getRelatorioVendas();
        setRelatorio(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelatorio();
  }, []);

  return (
    <div>
      <h1>Relatório de Vendas</h1>
      <ul>
        {relatorio.map((r) => (
          <li key={r.pedido}>
            Pedido: {r.pedido} | Cliente: {r.cliente_nome} | Valor Pago: R$ {r.valor_pago} | Status: {r.status_pagamento}
          </li>
        ))}
      </ul>
    </div>
  );
}

