import React, { useState } from 'react';
import CadastroProduto from '../components/Produtos/CadastroProduto';
import ListarProdutos from '../components/Produtos/ListarProdutos';
import BuscarProduto from '../components/Produtos/BuscarProduto';
import EditarProduto from '../components/Produtos/EditarProduto';
import BuscarPorCategoria from '../components/Produtos/BuscarPorCategoria';

export default function ProdutosPage() {
  const [paginaAtiva, setPaginaAtiva] = useState(null);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const handleEditClick = (produto) => {
    setProdutoParaEditar(produto);
    setPaginaAtiva('editar');
  };

  const handleUpdateComplete = () => {
    setProdutoParaEditar(null);
    setPaginaAtiva('lista'); // Volta para a lista após a edição
  };

  // Função para voltar ao menu principal
  const voltar = () => {
    setPaginaAtiva(null);
    setProdutoParaEditar(null); // Limpa o produto para edição
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Gerenciamento de Produtos</h1>

        {/* Menu de botões, visível apenas quando não há uma página ativa */}
        {!paginaAtiva && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => setPaginaAtiva('lista')} 
              className="py-4 px-6 bg-indigo-600 text-white rounded-lg shadow-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Listar Produtos
            </button>
            <button 
              onClick={() => setPaginaAtiva('cadastro')} 
              className="py-4 px-6 bg-green-600 text-white rounded-lg shadow-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Cadastrar Produto
            </button>
            <button 
              onClick={() => setPaginaAtiva('buscar')} 
              className="py-4 px-6 bg-blue-600 text-white rounded-lg shadow-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Buscar Produto
            </button>
            <button 
              onClick={() => setPaginaAtiva('categoria')} 
              className="py-4 px-6 bg-teal-600 text-white rounded-lg shadow-lg font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              Buscar por Categoria
            </button>
          </div>
        )}

        {/* Renderização condicional dos componentes */}
        <div className="mt-8">
          {paginaAtiva === 'lista' && <ListarProdutos onEditClick={handleEditClick} voltar={voltar} />}
          {paginaAtiva === 'cadastro' && <CadastroProduto voltar={voltar} />}
          {paginaAtiva === 'buscar' && <BuscarProduto voltar={voltar} />}
          {paginaAtiva === 'categoria' && <BuscarPorCategoria voltar={voltar} />}
          {paginaAtiva === 'editar' && <EditarProduto produto={produtoParaEditar} onUpdateComplete={handleUpdateComplete} voltar={voltar} />}
        </div>
      </div>
    </div>
  );
}
