import { useEffect, useState } from "react";
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from "../api/produtosApi";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco_custo: 0,
    preco_venda: 0,
    quantidade: 0,
    codigo_barras: "",
    codigo_referencia: "",
    categoria: "",
    tipo_produto: "padrao",
  });

  // Carregar lista de produtos ao iniciar
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await listarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const handleCriar = async () => {
    try {
      await criarProduto(novoProduto);
      await carregarProdutos();
      setNovoProduto({
        nome: "",
        descricao: "",
        preco_custo: 0,
        preco_venda: 0,
        quantidade: 0,
        codigo_barras: "",
        codigo_referencia: "",
        categoria: "",
        tipo_produto: "padrao",
      });
    } catch (error) {
      alert("Erro ao criar produto.");
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deletarProduto(id);
        await carregarProdutos();
      } catch (error) {
        alert("Erro ao excluir produto.");
      }
    }
  };

  return (
    <div>
      <h1>Produtos</h1>

      <h2>Criar Produto</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço de Venda"
        value={novoProduto.preco_venda}
        onChange={(e) => setNovoProduto({ ...novoProduto, preco_venda: e.target.value })}
      />
      <button onClick={handleCriar}>Adicionar Produto</button>

      <h2>Lista de Produtos</h2>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco_venda}  
            <button onClick={() => handleExcluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
