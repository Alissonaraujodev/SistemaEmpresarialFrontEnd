import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editarItensPedido,
  buscarPedido,
  finalizarPedido,
} from "../../api/vendasApi";

export default function EditarItensPage() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({ itens_vendidos: [] }); // garante array padrão

  const [novoItem, setNovoItem] = useState({
    nome: "",
    quantidade: 1,
    largura: "",
    altura: "",
  });

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const dados = await buscarPedido(pedidoId);
        // Garante que itens_vendidos seja sempre um array
        setPedido({ ...dados, itens_vendidos: dados.itens_vendidos || [] });
      } catch (err) {
        console.error("Erro ao carregar pedido:", err);
      }
    };
    fetchPedido();
  }, [pedidoId]);

  const handleAddItem = async () => {
    try {
      const novosItens = [...pedido.itens_vendidos, novoItem];
      await editarItensPedido(pedidoId, novosItens);
      setPedido({ ...pedido, itens_vendidos: novosItens });
      setNovoItem({ nome: "", quantidade: 1, largura: "", altura: "" });
    } catch (err) {
      alert("Erro ao adicionar item");
    }
  };

  const handleFinalizar = async () => {
    try {
      await finalizarPedido(pedidoId);
      alert("Venda finalizada com sucesso!");
      navigate("/vendas");
    } catch (err) {
      alert("Erro ao finalizar venda");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>✏️ Editar Itens do Pedido #{pedidoId}</h2>

      {/* Lista de itens */}
      <ul>
        {pedido.itens_vendidos.length > 0 ? (
          pedido.itens_vendidos.map((item, idx) => (
            <li key={idx}>
              {item.nome} - {item.quantidade}x
              {item.largura && item.altura
                ? ` (Largura: ${item.largura}, Altura: ${item.altura})`
                : ""}
            </li>
          ))
        ) : (
          <li>Nenhum item adicionado ainda.</li>
        )}
      </ul>

      <hr />

      {/* Adicionar novo item */}
      <h3>➕ Adicionar Item</h3>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={novoItem.nome}
        onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
      />
      <input
        type="number"
        min="1"
        placeholder="Quantidade"
        value={novoItem.quantidade}
        onChange={(e) =>
          setNovoItem({ ...novoItem, quantidade: parseInt(e.target.value) })
        }
      />
      <input
        type="number"
        min="0"
        placeholder="Largura"
        value={novoItem.largura}
        onChange={(e) =>
          setNovoItem({ ...novoItem, largura: parseFloat(e.target.value) })
        }
      />
      <input
        type="number"
        min="0"
        placeholder="Altura"
        value={novoItem.altura}
        onChange={(e) =>
          setNovoItem({ ...novoItem, altura: parseFloat(e.target.value) })
        }
      />
      <button onClick={handleAddItem}>Adicionar Item</button>

      <hr />

      <button
        onClick={handleFinalizar}
        style={{ background: "green", color: "white" }}
      >
        ✅ Finalizar Venda
      </button>
    </div>
  );
}
