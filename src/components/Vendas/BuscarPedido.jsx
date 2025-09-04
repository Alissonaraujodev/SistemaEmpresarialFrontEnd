import { useState } from "react";
import { buscarPedido } from "../../services/vendasService";

export default function BuscarPedido({ voltar }) {
  const [pedido, setPedido] = useState("");
  const [detalhes, setDetalhes] = useState(null);

  const handleBuscar = async () => {
    try {
      const res = await buscarPedido(pedido);
      setDetalhes(res);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>🔍 Buscar Pedido</h2>
      <input placeholder="Nº Pedido" value={pedido} onChange={(e) => setPedido(e.target.value)} />
      <button onClick={handleBuscar}>Buscar</button>
      <button onClick={voltar}>Voltar</button>

      {detalhes && (
        <pre>{JSON.stringify(detalhes, null, 2)}</pre>
      )}
    </div>
  );
}
