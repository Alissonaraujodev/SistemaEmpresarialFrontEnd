import { useEffect, useRef, useState } from "react";
import {
  editarItensPedido,
  finalizarPedido,
  buscarPedido,
} from "../../services/vendasService";
import api from "../../api/api";

export default function EditarPedido({ pedido: pedidoInicial, voltar }) {
  const [pedido, setPedido] = useState(pedidoInicial || "");
  const [itens, setItens] = useState([]); // novos itens
  const [itensExistentes, setItensExistentes] = useState([]); // do banco
  const [resumo, setResumo] = useState(null); // resumo financeiro
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [nomeAntigo, setNomeAntigo] = useState("");
  const [nomeNovo, setNomeNovo] = useState("");
  const [quantidadeNova, setQuantidadeNova] = useState(1);
  const debounceRef = useRef(null);

  // 🔎 Buscar produtos
  const buscarProdutos = async (texto) => {
    const termo = texto.trim();
    if (termo.length < 1) {
      setProdutos([]);
      return;
    }
    try {
      const res = await api.get(`/produtos?nome=${encodeURIComponent(termo)}`);
      const lista = Array.isArray(res.data) ? res.data : [];
      const filtrados = lista
        .filter((p) => (p.nome || "").toLowerCase().startsWith(termo.toLowerCase()))
        .slice(0, 10);
      setProdutos(filtrados);
    } catch {
      setProdutos([]);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => buscarProdutos(nome), 250);
    return () => clearTimeout(debounceRef.current);
  }, [nome]);

  // 🔎 Buscar itens e resumo do pedido
  const carregarPedido = async (numPedido) => {
    try {
      const res = await buscarPedido(numPedido);
      setItensExistentes(res.itens_vendidos || []);
      setResumo({
        total: res.valor_total,
        pago: res.valor_pago,
        status_pedido: res.status_pedido,
        status_pagamento: res.status_pagamento,
      });
    } catch (err) {
      setItensExistentes([]);
      setResumo(null);
      if (numPedido) {
        alert(err.message || "Erro ao buscar pedido");
      }
    }
  };

  useEffect(() => {
    if (pedido) {
      carregarPedido(pedido);
    }
  }, [pedido]);

  // ➕ Adicionar item novo
  const handleAddItem = () => {
    if (!nome) return alert("Escolha um produto");
    if (quantidade <= 0) return alert("Quantidade deve ser maior que zero");

    const novoItem = { nome, quantidade, largura, altura };
    setItens([...itens, novoItem]);
    setNome("");
    setQuantidade(1);
    setLargura("");
    setAltura("");
  };

  // 💾 Salvar alterações
  const handleSalvar = async () => {
    if (!pedido) return alert("Informe o número do pedido");
    if (itens.length === 0) return alert("Adicione ao menos um item");

    try {
      const resp = await editarItensPedido(pedido, itens);
      alert(`Itens atualizados! Total: R$ ${resp.valor_total}`);
      setItens([]);
      carregarPedido(pedido);
    } catch (err) {
      alert(err.message || "Erro ao salvar alterações");
    }
  };

  // ✅ Finalizar pedido
  const handleFinalizar = async () => {
    if (!pedido) return alert("Informe o número do pedido");
    try {
      await finalizarPedido(pedido);
      alert("Pedido finalizado!");
      voltar();
    } catch (err) {
      alert(err.message || "Erro ao finalizar");
    }
  };

  // 🔄 Substituir item
  const handleSubstituir = async () => {
    if (!pedido || !nomeAntigo || !nomeNovo) {
      return alert("Preencha pedido, item antigo e novo");
    }
    try {
      const res = await api.put(
        `/vendas/${pedido}/itens/substituir/${encodeURIComponent(nomeAntigo)}`,
        { nome_novo: nomeNovo, quantidade_nova: quantidadeNova, largura, altura }
      );
      alert(res.data.message || "Item substituído!");
      carregarPedido(pedido);
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao substituir item");
    }
  };

  // 🗑️ Deletar item
  const handleDeletar = async (nomeItem) => {
    if (!pedido) return alert("Informe o número do pedido");
    try {
      await api.delete(`/vendas/${pedido}/itens/${encodeURIComponent(nomeItem)}`);
      alert("Item deletado!");
      carregarPedido(pedido);
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao deletar item");
    }
  };

  // ✏️ Atualizar quantidade
  const handleAtualizarQuantidade = async (item) => {
    if (!pedido) return alert("Informe o número do pedido");
    if (item.quantidade <= 0) return alert("Quantidade deve ser maior que zero");

    try {
      const resp = await editarItensPedido(pedido, [
        {
          nome: item.nome_produto,
          quantidade: item.quantidade,
          largura: item.largura,
          altura: item.altura,
        },
      ]);
      alert(resp.message || "Quantidade atualizada!");
      carregarPedido(pedido);
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao atualizar quantidade");
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>✏️ Editar Pedido</h2>

      {/* Nº do pedido */}
      <label>Nº do Pedido</label>
      <input
        type="text"
        value={pedido}
        onChange={(e) => setPedido(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      {/* Produto + autocomplete */}
      <label>Produto</label>
      <input
        type="text"
        placeholder="Digite o nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      {produtos.length > 0 && (
        <ul style={{ border: "1px solid #ddd", borderRadius: 8, maxHeight: 200, overflowY: "auto" }}>
          {produtos.map((p) => (
            <li
              key={p.codigo_barras}
              style={{ padding: "6px 10px", cursor: "pointer" }}
              onClick={() => {
                setNome(p.nome);
                setProdutos([]);
              }}
            >
              {p.nome}
            </li>
          ))}
        </ul>
      )}

      <label>Quantidade</label>
      <input
        type="number"
        min={1}
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <label>Largura (m)</label>
      <input
        type="number"
        step="0.01"
        value={largura}
        onChange={(e) => setLargura(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <label>Altura (m)</label>
      <input
        type="number"
        step="0.01"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <button onClick={handleAddItem}>➕ Adicionar Item</button>

      {/* Itens existentes */}
      <h3 style={{ marginTop: 20 }}>Itens do Pedido (Banco)</h3>
      <ul>
        {itensExistentes.map((item, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {item.nome_produto} -{" "}
            <input
              type="number"
              min={1}
              value={item.quantidade}
              onChange={(e) => {
                const novos = [...itensExistentes];
                novos[i].quantidade = Number(e.target.value);
                setItensExistentes(novos);
              }}
              style={{ width: 60 }}
            />{" "}
            {item.largura && item.altura ? `(${item.largura}m x ${item.altura}m)` : ""}
            <button onClick={() => handleAtualizarQuantidade(item)} style={{ marginLeft: 8 }}>
              🔄 Atualizar
            </button>
            <button onClick={() => handleDeletar(item.nome_produto)} style={{ marginLeft: 8 }}>
              🗑️ Deletar
            </button>
          </li>
        ))}
      </ul>

      {/* Itens novos */}
      <h3 style={{ marginTop: 20 }}>Itens novos (ainda não salvos)</h3>
      <ul>
        {itens.map((item, i) => (
          <li key={i}>
            {item.nome} - {item.quantidade}
            {item.largura && item.altura ? ` (${item.largura}m x ${item.altura}m)` : ""}
          </li>
        ))}
      </ul>

      {/* Resumo financeiro */}
      {resumo && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#f9f9f9",
          }}
        >
          <h3>📊 Resumo Financeiro</h3>
          <p>
            <strong>Status Pedido:</strong> {resumo.status_pedido}
          </p>
          <p>
            <strong>Status Pagamento:</strong> {resumo.status_pagamento}
          </p>
          <p>
            <strong>Valor Total:</strong> R$ {resumo.total}
          </p>
          <p>
            <strong>Valor Pago:</strong> R$ {resumo.pago}
          </p>
          <p>
            <strong>Faltante:</strong> R$ {Number(resumo.total) - Number(resumo.pago)}
          </p>
        </div>
      )}

      {/* Substituir item */}
      <h3 style={{ marginTop: 20 }}>🔄 Substituir Item</h3>
      <input
        type="text"
        placeholder="Item antigo"
        value={nomeAntigo}
        onChange={(e) => setNomeAntigo(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Item novo"
        value={nomeNovo}
        onChange={(e) => setNomeNovo(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="number"
        min={1}
        value={quantidadeNova}
        onChange={(e) => setQuantidadeNova(Number(e.target.value))}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button onClick={handleSubstituir}>Substituir</button>

      {/* Ações */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <button onClick={handleSalvar}>💾 Salvar Alterações</button>
        <button onClick={handleFinalizar}>✅ Finalizar Pedido</button>
        <button onClick={voltar}>↩️ Voltar</button>
      </div>
    </div>
  );
}
