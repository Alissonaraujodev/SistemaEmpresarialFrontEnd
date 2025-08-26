import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { abrirPedido } from "../../api/vendasApi";
import { listarClientes } from "../../services/ClientesService"; // Importa a função para buscar clientes

export default function AbrirPedidoPage({ voltar }) {
  const [clienteNome, setClienteNome] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Variável para o timeout da busca (evita muitas requisições)
  let searchTimeout;

  const handleAbrirPedido = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Abre o pedido com o nome do cliente selecionado ou digitado
      const response = await abrirPedido(clienteNome || "Cliente Padrão");
      navigate(`/vendas/editar/${response.pedido}`);
    } catch (error) {
      console.error("Erro ao abrir pedido:", error);
      setMessage(error.message || "Erro ao abrir pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (e) => {
    const nome = e.target.value;
    setClienteNome(nome);
    
    // Limpa o timeout anterior para evitar múltiplas requisições
    clearTimeout(searchTimeout);

    if (nome.length > 2) { // Começa a buscar após 2 caracteres
      searchTimeout = setTimeout(async () => {
        try {
          const clientesEncontrados = await listarClientes(nome);
          setSugestoes(clientesEncontrados);
        } catch (error) {
          console.error("Erro ao buscar clientes:", error);
          setSugestoes([]); // Limpa as sugestões em caso de erro
        }
      }, 500); // Espera 500ms antes de buscar
    } else {
      setSugestoes([]); // Limpa as sugestões se o campo for apagado
    }
  };

  const handleSelectSuggestion = (cliente) => {
    setClienteNome(cliente.cliente_nome);
    setSugestoes([]); // Limpa as sugestões após a seleção
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">🛒 Abrir Pedido</h2>
      
      {message && (
        <div className="p-3 rounded-lg text-sm mb-4 bg-red-100 text-red-700">
          {message}
        </div>
      )}

      <div className="space-y-4 relative"> {/* `relative` é necessário para o posicionamento da lista de sugestões */}
        <div>
          <label htmlFor="clienteNome" className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
          <input
            id="clienteNome"
            type="text"
            placeholder="Nome do cliente (opcional)"
            value={clienteNome}
            onChange={handleSearchChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {sugestoes.length > 0 && (
            <ul className="absolute z-10 w-full bg-white rounded-md shadow-lg max-h-48 overflow-y-auto mt-1 border border-gray-200">
              {sugestoes.map((cliente) => (
                <li
                  key={cliente.cnpj} // Usamos o CNPJ como chave única
                  onClick={() => handleSelectSuggestion(cliente)}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm"
                >
                  {cliente.cliente_nome}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAbrirPedido}
            disabled={loading}
            className="flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Abrindo...' : 'Abrir Pedido'}
          </button>
          <button 
            onClick={voltar}
            type="button"
            className="flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
