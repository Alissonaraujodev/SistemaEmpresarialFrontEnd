import api from "../api/api";

// ----------------- VENDAS -----------------

// Buscar todos os pedidos
export const getAllVendas = async () => {
  try {
    const res = await api.get("/vendas");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar vendas" };
  }
};

// Abrir novo pedido
export const abrirPedido = async (cliente_nome) => {
  try {
    const res = await api.post("/vendas", { cliente_nome  });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao abrir pedido" };
  }
};

// Buscar pedido específico
export const buscarPedido = async (pedido) => {
  try {
    const res = await api.get(`/vendas/${pedido}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar pedido" };
  }
};

// Editar itens do pedido (agora pelo nome, quantidade, largura e altura)
export const editarItensPedido = async (pedido, itens) => {
  try {
    const res = await api.put(`/vendas/${pedido}/itens`, { itens });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao editar itens do pedido" };
  }
};

// Finalizar pedido
export const finalizarPedido = async (pedido) => {
  try {
    const res = await api.put(`/vendas/${pedido}/finalizar`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao finalizar pedido" };
  }
};

// Cancelar pedido
export const cancelarPedido = async (pedido, motivo_cancelamento) => {
  try {
    const res = await api.put(`/vendas/cancelar`, { pedido, motivo_cancelamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao cancelar pedido" };
  }
};

// Liberar edição de pedido
export const liberarEdicaoPedido = async (pedido, motivo_abertura, responsavel_abertura) => {
  try {
    const res = await api.put(`/vendas/${pedido}/liberar-edicao`, { motivo_abertura, responsavel_abertura });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao liberar edição do pedido" };
  }
};

// Registrar pagamento de um pedido
export const pagarPedido = async (pedido, valor_pagamento, forma_pagamento) => {
  try {
    const res = await api.post(`/vendas/${pedido}/pagar`, { valor_pagamento, forma_pagamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao registrar pagamento" };
  }
};

// Registrar pagamento por cliente (dividindo entre pedidos)
export const pagarCliente = async (clienteNome, valor_pagamento, forma_pagamento) => {
  try {
    const res = await api.post(`/vendas/cliente/${clienteNome}/pagar`, { valor_pagamento, forma_pagamento });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao registrar pagamento do cliente" };
  }
};
