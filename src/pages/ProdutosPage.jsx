import React, { useEffect, useState } from "react";
import { getAllProdutos } from "../services/ProdutosService";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getAllProdutos();
        setProdutos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProdutos();
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
  );
}
