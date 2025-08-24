import React, { useState, useEffect } from 'react';
import { listarProdutos, deletarProduto } from '../../services/ProdutosService';

const ListarProdutos = ({ onEditClick }) => {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const carregarProdutos = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await listarProdutos();
      setProdutos(data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os produtos. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleExcluir = async (id) => {
    setMessage('');
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const data = await deletarProduto(id);
        if (data.message) {
          setMessage('Produto excluído com sucesso!');
          setIsSuccess(true);
          carregarProdutos(); // Recarrega a lista após a exclusão
        }
      } catch (error) {
        console.error("Erro ao excluir produto:", error.message);
        setMessage(error.message || 'Erro de conexão.');
        setIsSuccess(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Lista de Produtos</h2>

      {message && (
        <div className={`p-3 rounded-lg text-sm mb-4 ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {isLoading && <p className="text-center text-gray-500">Carregando produtos...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.length > 0 ? (
                produtos.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {parseFloat(p.preco_venda).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => onEditClick(p)} 
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleExcluir(p.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Nenhum produto encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListarProdutos;
