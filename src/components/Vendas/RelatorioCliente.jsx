import { useState } from "react";
import api from "../../api/api";

export default function RelatorioCliente({ voltar }) {
  const [cliente, setCliente] = useState("");
  const [relatorio, setRelatorio] = useState(null);

  const handleBuscar = async () => {
    try {
      const res = await api.get(`/vendas/${cliente}/relatorio`);
      setRelatorio(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao buscar relatório");
    }
  };

  return (
    <div>
      <h2>📊 Relatório por Cliente</h2>
      <input placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
      <button onClick={handleBuscar}>Gerar Relatório</button>
      <button onClick={voltar}>Voltar</button>

      {relatorio && (
        <pre>{JSON.stringify(relatorio, null, 2)}</pre>
      )}
    </div>
  );
}
