import { useState } from "react";
import { cancelarPedido } from "../../api/vendasApi";

export default function CancelarPedido({ voltar }) {
  const [pedidoId, setPedidoId] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleCancelar = async () => {
    try {
      const response = await cancelarPedido(pedidoId, motivo);
      alert(response.message);
    } catch (err) {
      alert("Erro ao cancelar pedido");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>❌ Cancelar Pedido</h2>

      <input
        type="number"
        placeholder="ID do pedido"
        value={pedidoId}
        onChange={(e) => setPedidoId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Motivo do cancelamento"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <button onClick={handleCancelar}>Cancelar</button>
      <button onClick={voltar} style={{ marginLeft: "10px" }}>⬅ Voltar</button>
    </div>
  );
}
