import { useState } from "react";
import { cancelarPedido } from "../../services/vendasService";

export default function CancelarPedido({ voltar }) {
  const [pedido, setPedido] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleCancelar = async () => {
    try {
      await cancelarPedido(pedido, motivo);
      alert("Pedido cancelado!");
      voltar();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>❌ Cancelar Pedido</h2>
      <input placeholder="Nº Pedido" value={pedido} onChange={(e) => setPedido(e.target.value)} />
      <input placeholder="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
      <button onClick={handleCancelar}>Cancelar</button>
      <button onClick={voltar}>Voltar</button>
    </div>
  );
}
