// Importa a instância da API para todas as requisições
import api from "../api/api";

// ----------------- CLIENTES -----------------

/**
 * Cadastra um novo cliente.
 * @param {object} dadosCliente - Os dados do cliente a ser cadastrado.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const cadastrarCliente = async (dadosCliente) => {
  try {
    const res = await api.post("/clientes", dadosCliente);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao cadastrar cliente." };
  }
};

/**
 * Busca clientes com base em um termo de busca no nome (lista múltiplos resultados).
 * @param {string} termo - Termo de busca para o nome do cliente.
 * @returns {Promise<array>} Uma lista de clientes encontrados.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const listarClientes = async (termo = '') => {
  try {
    const res = await api.get(`/clientes?search=${encodeURIComponent(termo)}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao listar clientes." };
  }
};

/**
 * Busca um único cliente por um identificador (CNPJ ou nome).
 * @param {string} identificador - O CNPJ ou nome do cliente.
 * @returns {Promise<object>} O cliente encontrado.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const buscarCliente = async (identificador) => {
  try {
    const res = await api.get(`/clientes/${encodeURIComponent(identificador)}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar cliente." };
  }
};

/**
 * Atualiza os dados de um cliente existente.
 * @param {string} identificador - O CNPJ ou nome do cliente a ser atualizado.
 * @param {object} dadosAtualizados - Os novos dados do cliente.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const atualizarCliente = async (identificador, dadosAtualizados) => {
  try {
    const res = await api.put(`/clientes/${encodeURIComponent(identificador)}`, dadosAtualizados);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao atualizar cliente." };
  }
};

/**
 * Exclui um cliente por seu identificador (CNPJ ou nome).
 * @param {string} identificador - O CNPJ ou nome do cliente a ser excluído.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const deletarCliente = async (identificador) => {
  try {
    const res = await api.delete(`/clientes/${encodeURIComponent(identificador)}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao deletar cliente." };
  }
};
