import React, { useState } from 'react';
import { buscarProduto } from '../../services/ProdutosService';

const BuscarProduto = ({ voltar }) => {
  const [identificador, setIdentificador] = useState('');
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setProduto(null);

    try {
      const result = await buscarProduto(identificador);
      setProduto(result);
      if (!result) {
        setMessage('Produto não encontrado.');
      }
    } catch (err) {
      setMessage(err.message || 'Erro ao buscar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Buscar Produto</h2>
      
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Digite o ID, nome ou código de referência"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
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

      {produto && (
        <div className="border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">{produto.nome}</h3>
          <p className="text-gray-600"><strong>ID:</strong> {produto.id}</p>
          <p className="text-gray-600"><strong>Referência:</strong> {produto.codigo_referencia}</p>
          <p className="text-gray-600"><strong>Código de Barras:</strong> {produto.codigo_barras}</p>
          <p className="text-gray-600"><strong>Categoria:</strong> {produto.categoria}</p>
          <p className="text-gray-600"><strong>Preço de Venda:</strong> R$ {parseFloat(produto.preco_venda).toFixed(2)}</p>
          <p className="text-gray-600"><strong>Estoque:</strong> {produto.quantidade}</p>
          <p className="text-gray-600"><strong>Descrição:</strong> {produto.descricao}</p>
        </div>
      )}
      
      {/* Botão de Voltar adicionado aqui */}
      <button 
        onClick={voltar} 
        className="mt-6 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
      >
        Voltar
      </button>
    </div>
  );
};

export default BuscarProduto;
