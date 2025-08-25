import { useState } from "react";
import { liberarEdicaoPedido } from "../../api/vendasApi";

export default function LiberarPedido({ voltar }) {
  const [pedidoId, setPedidoId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleLiberar = async () => {
    try {
      const response = await liberarEdicaoPedido(pedidoId, motivo, responsavel);
      alert(response.message);
    } catch (err) {
      alert("Erro ao liberar edição");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🔓 Liberar Edição do Pedido</h2>

      <input
        type="number"
        placeholder="ID do pedido"
        value={pedidoId}
        onChange={(e) => setPedidoId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Responsável"
        value={responsavel}
        onChange={(e) => setResponsavel(e.target.value)}
      />

      <button onClick={handleLiberar}>Liberar</button>
      <button onClick={voltar} style={{ marginLeft: "10px" }}>⬅ Voltar</button>
    </div>
  );
}
