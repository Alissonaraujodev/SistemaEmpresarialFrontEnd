import React, { useEffect, useState } from "react";
import { getMovimentacoesCaixa } from "../services/CaixaService";

export default function CaixaPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    const fetchMovimentacoes = async () => {
      try {
        const data = await getMovimentacoesCaixa();
        setMovimentacoes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovimentacoes();
  }, []);

  return (
    <div>
      <h1>Movimentações do Caixa</h1>
      <ul>
        {movimentacoes.map((m) => (
          <li key={m.id}>
            {m.descricao} | Tipo: {m.tipo} | Valor: R$ {m.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

