import api from "./api"; // Conexão base axios (já configurada com URL base + token)

// ----------------- VENDAS -----------------

/**
 * Busca todos os pedidos.
 * @returns {Promise<Array>} Uma lista de pedidos.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const getAllVendas = async () => {
  try {
    const res = await api.get("/vendas");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar vendas" };
  }
};

/**
 * Abre um novo pedido.
 * @param {string} cliente_nome - O nome do cliente para o novo pedido.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const abrirPedido = async (cliente_nome) => {
  try {
    const res = await api.post("/vendas", { cliente_nome });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao abrir pedido" };
  }
};

/**
 * Busca um pedido específico por ID.
 * @param {string} pedido - O ID do pedido a ser buscado.
 * @returns {Promise<object>} O pedido encontrado.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const buscarPedido = async (pedido) => {
  try {
    const res = await api.get(`/vendas/${pedido}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar pedido" };
  }
};

/**
 * Edita os itens de um pedido.
 * @param {string} pedido - O ID do pedido a ser editado.
 * @param {Array<object>} itens - A lista de itens a serem atualizados.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const editarItensPedido = async (pedido, itens) => {
  try {
    const res = await api.put(`/vendas/${pedido}/itens`, { itens });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao editar itens do pedido" };
  }
};

/**
 * Finaliza um pedido.
 * @param {string} pedido - O ID do pedido a ser finalizado.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const finalizarPedido = async (pedido) => {
  try {
    const res = await api.put(`/vendas/${pedido}/finalizar`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao finalizar pedido" };
  }
};

/**
 * Cancela um pedido.
 * @param {string} pedido - O ID do pedido a ser cancelado.
 * @param {string} motivo_cancelamento - O motivo do cancelamento.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const cancelarPedido = async (pedido, motivo_cancelamento) => {
  try {
    const res = await api.put(`/vendas/cancelar`, { pedido, motivo_cancelamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao cancelar pedido" };
  }
};

/**
 * Libera a edição de um pedido.
 * @param {string} pedido - O ID do pedido.
 * @param {string} motivo_abertura - O motivo da reabertura.
 * @param {string} responsavel_abertura - O responsável pela reabertura.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const liberarEdicaoPedido = async (pedido, motivo_abertura, responsavel_abertura) => {
  try {
    const res = await api.put(`/vendas/${pedido}/liberar-edicao`, { motivo_abertura, responsavel_abertura });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao liberar edição do pedido" };
  }
};

/**
 * Registra o pagamento de um pedido.
 * @param {string} pedido - O ID do pedido.
 * @param {number} valor_pagamento - O valor do pagamento.
 * @param {string} forma_pagamento - A forma de pagamento.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const pagarPedido = async (pedido, valor_pagamento, forma_pagamento) => {
  try {
    const res = await api.post(`/vendas/${pedido}/pagar`, { valor_pagamento, forma_pagamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao registrar pagamento" };
  }
};

/**
 * Registra o pagamento por cliente.
 * @param {string} clienteNome - O nome do cliente.
 * @param {number} valor_pagamento - O valor do pagamento.
 * @param {string} forma_pagamento - A forma de pagamento.
 * @returns {Promise<object>} A resposta da API.
 * @throws {Error} O erro da API ou uma mensagem padrão.
 */
export const pagarCliente = async (clienteNome, valor_pagamento, forma_pagamento) => {
  try {
    const res = await api.post(`/vendas/cliente/${clienteNome}/pagar`, { valor_pagamento, forma_pagamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao registrar pagamento do cliente" };
  }
};
