import React, { useState } from 'react';
import { listarProdutosPorCategoria } from '../../services/ProdutosService';

const BuscarPorCategoria = ({ voltar }) => {
  const [categoria, setCategoria] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setProdutos([]);

    try {
      const result = await listarProdutosPorCategoria(categoria);
      setProdutos(result);
      if (result.length === 0) {
        setMessage('Nenhum produto encontrado para esta categoria.');
      }
    } catch (err) {
      setMessage(err.message || 'Erro ao buscar produtos por categoria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Buscar por Categoria</h2>
      
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Digite o nome da categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {message && <p className="text-red-600 text-sm mb-4">{message}</p>}

      {produtos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {parseFloat(p.preco_venda).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.quantidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button 
        onClick={voltar} 
        className="mt-6 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
      >
        Voltar
      </button>
    </div>
  );
};

export default BuscarPorCategoria;
