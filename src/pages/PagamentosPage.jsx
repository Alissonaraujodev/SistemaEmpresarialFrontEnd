import { useState } from "react";
import { pagarPedido, pagarCliente, relatorioCliente } from "../api/pagamentosApi";

export default function PagamentosPage() {
  const [pedidoId, setPedidoId] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [valor, setValor] = useState("");
  const [forma, setForma] = useState("dinheiro");
  const [relatorio, setRelatorio] = useState(null);

  const handlePagarPedido = async () => {
    try {
      const res = await pagarPedido(pedidoId, { valor_pagamento: parseFloat(valor), forma_pagamento: forma });
      alert(res.message);
    } catch (err) {
      console.error("Erro ao pagar pedido:", err);
    }
  };

  const handlePagarCliente = async () => {
    try {
      const res = await pagarCliente(clienteNome, { valor_pagamento: parseFloat(valor), forma_pagamento: forma });
      alert(res.message);
    } catch (err) {
      console.error("Erro ao pagar cliente:", err);
    }
  };

  const handleRelatorio = async () => {
    try {
      const dados = await relatorioCliente(clienteNome);
      setRelatorio(dados);
    } catch (err) {
      console.error("Erro ao carregar relatório:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💳 Pagamentos</h1>

      <div>
        <h3>Pagar Pedido</h3>
        <input value={pedidoId} onChange={(e) => setPedidoId(e.target.value)} placeholder="ID do Pedido" />
        <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" type="number" />
        <select value={forma} onChange={(e) => setForma(e.target.value)}>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">PIX</option>
          <option value="cartao">Cartão</option>
        </select>
        <button onClick={handlePagarPedido}>Pagar Pedido</button>
      </div>

      <div>
        <h3>Pagar por Cliente</h3>
        <input value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} placeholder="Nome do Cliente" />
        <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" type="number" />
        <button onClick={handlePagarCliente}>Pagar Cliente</button>
      </div>

      <div>
        <h3>Relatório Cliente</h3>
        <input value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} placeholder="Nome do Cliente" />
        <button onClick={handleRelatorio}>Ver Relatório</button>
        {relatorio && (
          <pre>{JSON.stringify(relatorio, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
