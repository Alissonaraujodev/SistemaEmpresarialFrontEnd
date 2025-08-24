import React, { useState } from 'react';
// Importação da nova camada de serviço
import { criarProduto } from '../../services/ProdutosService';

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco_custo: 0,
    preco_venda: 0,
    quantidade_estoque: 0,
    codigo_barras: '',
    codigo_referencia: '',
    categoria: '',
    tipo_produto: 'padrao', // Define 'padrao' como o valor inicial
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await criarProduto(formData);
      if (data.message) {
        setMessage(data.message);
        setIsSuccess(true);
        setFormData({
          nome: '',
          descricao: '',
          preco_custo: 0,
          preco_venda: 0,
          quantidade_estoque: 0,
          codigo_barras: '',
          codigo_referencia: '',
          categoria: '',
          tipo_produto: 'padrao',
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
      setMessage(error.message || 'Erro de conexão com o servidor.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Cadastrar Novo Produto</h2>
      
      {message && (
        <div className={`p-3 rounded-lg text-sm mb-4 ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formulário com campos de entrada, similar ao seu código original */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
            <input type="text" name="categoria" id="categoria" value={formData.categoria} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="codigo_barras" className="block text-sm font-medium text-gray-700">Código de Barras</label>
            <input type="text" name="codigo_barras" id="codigo_barras" value={formData.codigo_barras} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="codigo_referencia" className="block text-sm font-medium text-gray-700">Código de Referência</label>
            <input type="text" name="codigo_referencia" id="codigo_referencia" value={formData.codigo_referencia} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="preco_custo" className="block text-sm font-medium text-gray-700">Preço de Custo</label>
            <input type="number" step="0.01" name="preco_custo" id="preco_custo" value={formData.preco_custo} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="preco_venda" className="block text-sm font-medium text-gray-700">Preço de Venda</label>
            <input type="number" step="0.01" name="preco_venda" id="preco_venda" value={formData.preco_venda} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipo_produto" className="block text-sm font-medium text-gray-700">Tipo de Produto</label>
            <select name="tipo_produto" id="tipo_produto" value={formData.tipo_produto} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="padrao">Padrão</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
          {formData.tipo_produto === 'padrao' && (
            <div>
              <label htmlFor="quantidade_estoque" className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
              <input type="number" name="quantidade_estoque" id="quantidade_estoque" value={formData.quantidade_estoque} onChange={handleChange} required={formData.tipo_produto === 'padrao'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default CadastroProduto;
