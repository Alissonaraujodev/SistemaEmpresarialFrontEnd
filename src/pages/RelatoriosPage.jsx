import { useEffect, useState } from "react";
import { getRelatorioVendas } from "../api/relatoriosApi";

export default function RelatoriosPage() {
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarRelatorio = async () => {
      try {
        const dados = await getRelatorioVendas({
          status_venda: "Concluída", // exemplo de filtro
        });
        setRelatorio(dados);
      } catch (error) {
        alert("Erro ao carregar relatório de vendas");
      } finally {
        setLoading(false);
      }
    };

    carregarRelatorio();
  }, []);

  if (loading) return <p>Carregando relatório...</p>;

  if (!relatorio) return <p>Nenhum relatório encontrado.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Relatório de Vendas</h1>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>Total de Vendas:</strong> {relatorio.total_vendas}</p>
        <p><strong>Soma Valor Total:</strong> R$ {relatorio.soma_valor_total_vendas}</p>
        <p><strong>Soma Valor Pago:</strong> R$ {relatorio.soma_valor_pago_vendas}</p>
      </div>

      <h2>Detalhes das Vendas</h2>
      <ul>
        {relatorio.vendas_detalhadas.map((venda) => (
          <li key={venda.pedido}>
            <strong>Pedido:</strong> {venda.pedido} - {venda.cliente_nome}  
            <br />
            <strong>Status Venda:</strong> {venda.status_venda} |  
            <strong> Pagamento:</strong> {venda.status_pagamento}  
            <br />
            <strong>Total:</strong> R$ {venda.valor_total} |  
            <strong> Pago:</strong> R$ {venda.valor_pago}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
