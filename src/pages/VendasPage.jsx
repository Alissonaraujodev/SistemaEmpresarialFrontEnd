import React, { useEffect, useState } from "react";
import { getAllVendas } from "../services/VendasService";

export default function VendasPage() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const data = await getAllVendas();
        setVendas(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVendas();
  }, []);

  return (
    <div>
      <h1>Vendas</h1>
      <ul>
        {vendas.map((v) => (
          <li key={v.pedido}>
            Pedido: {v.pedido} | Cliente: {v.cliente_nome} | Total: R$ {v.valor_total}
          </li>
        ))}
      </ul>
    </div>
  );
}
