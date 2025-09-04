import { useEffect, useRef, useState } from "react";
import { abrirPedido } from "../../services/vendasService";
import api from "../../api/api";
import EditarPedido from "./EditarPedido";

export default function AbrirPedido({ voltar }) {
  const [cliente, setCliente] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [pedidoAberto, setPedidoAberto] = useState(null);
  const debounceRef = useRef(null);

  // Busca clientes com debounce e aplica filtro startsWith no front
  const buscarClientes = async (texto) => {
    const termo = texto.trim();
    if (termo.length < 1) {
      setSugestoes([]);
      return;
    }
    try {
      // Ajuste a rota abaixo para a tua rota real de busca de clientes
      // Ex.: /clientes?nome=  (supondo que já exista)
      const res = await api.get(`/clientes?nome=${encodeURIComponent(termo)}`);
      const lista = Array.isArray(res.data) ? res.data : [];

      const lower = termo.toLowerCase();
      const filtrados = lista
        .filter((c) => (c.cliente_nome || "").toLowerCase().startsWith(lower))
        .slice(0, 10);

      setSugestoes(filtrados);
    } catch {
      setSugestoes([]);
    }
  };

  useEffect(() => {
    // Debounce: 250ms após digitar
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => buscarClientes(cliente), 250);
    return () => clearTimeout(debounceRef.current);
  }, [cliente]);

  const handleAbrir = async () => {
    const nome = cliente.trim();
    if (!nome) {
      alert("Informe o nome do cliente");
      return;
    }
    try {
      const resp = await abrirPedido(nome); // envia { cliente_nome }
      // backend retorna: { message, pedido }
      setPedidoAberto(resp.pedido);
    } catch (err) {
      alert(err?.message || "Erro ao abrir pedido");
    }
  };

  if (pedidoAberto) {
    // Após abrir, vai direto para editar itens
    return <EditarPedido pedido={pedidoAberto} voltar={voltar} />;
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>📂 Abrir Pedido</h2>

      <label style={{ display: "block", marginBottom: 8 }}>Cliente</label>
      <input
        type="text"
        placeholder="Digite o nome do cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        style={{ width: "100%", padding: 8 }}
        autoFocus
      />

      {/* sugestões (somente os que começam com o que foi digitado) */}
      {sugestoes.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: 8,
            border: "1px solid #ddd",
            borderRadius: 8,
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {sugestoes.map((c) => (
            <li
              key={c.cnpj ?? c.cliente_nome}
              style={{ padding: "8px 12px", cursor: "pointer" }}
              onClick={() => {
                setCliente(c.cliente_nome);
                setSugestoes([]);
              }}
            >
              {c.cliente_nome}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={handleAbrir}>Abrir</button>
        <button onClick={voltar}>Voltar</button>
      </div>
    </div>
  );
}
