import React, { useState } from 'react';
import CadastroProduto from '../components/Produtos/CadastroProduto';
import ListarProdutos from '../components/Produtos/ListarProdutos';
import BuscarProduto from '../components/Produtos/BuscarProduto';
import EditarProduto from '../components/Produtos/EditarProduto';

export default function ProdutosPage() {
  const [currentView, setCurrentView] = useState('lista');
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const handleEditClick = (produto) => {
    setProdutoParaEditar(produto);
    setCurrentView('editar');
  };

  const handleUpdateComplete = () => {
    setProdutoParaEditar(null);
    setCurrentView('lista');
  };

  const handleCancelEdit = () => {
    setProdutoParaEditar(null);
    setCurrentView('lista');
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Gerenciamento de Produtos</h1>

        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => setCurrentView('lista')} 
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${currentView === 'lista' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-600'}`}
          >
            Listar Produtos
          </button>
          <button 
            onClick={() => setCurrentView('cadastro')} 
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${currentView === 'cadastro' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-600'}`}
          >
            Cadastrar Produto
          </button>
          <button 
            onClick={() => setCurrentView('buscar')} 
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${currentView === 'buscar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-600'}`}
          >
            Buscar Produto
          </button>
          {produtoParaEditar && (
            <button 
              onClick={() => setCurrentView('editar')} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${currentView === 'editar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-600'}`}
            >
              Editar Produto
            </button>
          )}
        </div>

        <div>
          {currentView === 'lista' && <ListarProdutos onEditClick={handleEditClick} />}
          {currentView === 'cadastro' && <CadastroProduto />}
          {currentView === 'buscar' && <BuscarProduto onEditClick={handleEditClick} />}
          {currentView === 'editar' && <EditarProduto produto={produtoParaEditar} onUpdateComplete={handleUpdateComplete} onCancel={handleCancelEdit} />}
        </div>
      </div>
    </div>
  );
}
