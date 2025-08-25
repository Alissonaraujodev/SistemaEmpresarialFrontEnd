import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { abrirPedido } from "../../api/vendasApi";

export default function AbrirPedidoPage() {
  const [clienteNome, setClienteNome] = useState("");
  const navigate = useNavigate();

  const handleAbrirPedido = async () => {
    try {
      const response = await abrirPedido(clienteNome || "Cliente Padrão");

      // após abrir, já redireciona para edição de itens
      navigate(`/vendas/editar/${response.pedido}`);
    } catch (error) {
      alert("Erro ao abrir pedido");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Abrir Pedido</h2>

      <input
        type="text"
        placeholder="Nome do cliente"
        value={clienteNome}
        onChange={(e) => setClienteNome(e.target.value)}
      />
      <button onClick={handleAbrirPedido}>Abrir Pedido</button>
    </div>
  );
}
