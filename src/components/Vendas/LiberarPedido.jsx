import { useState } from "react";
import { liberarEdicaoPedido } from "../../services/vendasService";

export default function LiberarPedido({ voltar }) {
  const [pedido, setPedido] = useState("");
  const [motivo, setMotivo] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleLiberar = async () => {
    try {
      await liberarEdicaoPedido(pedido, motivo, responsavel);
      alert("Pedido liberado!");
      voltar();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>🔓 Liberar Pedido</h2>
      <input placeholder="Nº Pedido" value={pedido} onChange={(e) => setPedido(e.target.value)} />
      <input placeholder="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
      <input placeholder="Responsável" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
      <button onClick={handleLiberar}>Liberar</button>
      <button onClick={voltar}>Voltar</button>
    </div>
  );
}
