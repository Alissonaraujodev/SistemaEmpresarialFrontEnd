import React, { useState, useEffect } from 'react';
import { atualizarProduto } from '../../services/ProdutosService';

const EditarProduto = ({ produto, onUpdateComplete, voltar }) => {
  const [formData, setFormData] = useState({ ...produto });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Garante que o formulário seja atualizado se o produto mudar
    if (produto) {
      setFormData({ ...produto });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await atualizarProduto(produto.codigo_barras, formData);
      setMessage(result.message || 'Produto atualizado com sucesso!');
      onUpdateComplete();
    } catch (err) {
      setMessage(err.message || 'Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  };

  if (!produto) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-gray-600">Selecione um produto para editar.</div>
        <button
          onClick={voltar}
          className="py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Editar Produto</h2>
      
      {message && (
        <div className={`p-3 rounded-lg text-sm mb-4 ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="preco_venda" className="block text-sm font-medium text-gray-700">Preço de Venda</label>
            <input type="number" step="0.01" name="preco_venda" id="preco_venda" value={formData.preco_venda} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <input type="number" name="quantidade" id="quantidade" value={formData.quantidade} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button
            type="button"
            onClick={voltar}
            className="flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProduto;
