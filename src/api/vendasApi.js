import axios from "axios";

const API_URL = "http://localhost:3000/vendas"; // rota do backend


// Abrir pedido
export const abrirPedido = async (cliente_nome) => {
  const res = await axios.post(API_URL, { cliente_nome }, { headers: getAuthHeader() });
  return res.data;
};

// Buscar pedido
export const buscarPedido = async (pedido) => {
  const res = await axios.get(`${API_URL}/${pedido}`, { headers: getAuthHeader() });
  return res.data;
};

// Editar itens do pedido (nome, quantidade, largura, altura)
export const editarItensPedido = async (pedido, itens) => {
  const res = await axios.put(`${API_URL}/${pedido}/itens`, { itens }, { headers: getAuthHeader() });
  return res.data;
};

// Finalizar pedido
export const finalizarPedido = async (pedido) => {
  const res = await axios.put(`${API_URL}/${pedido}/finalizar`, {}, { headers: getAuthHeader() });
  return res.data;
};

// Cancelar pedido
export const cancelarPedido = async (pedido, motivo_cancelamento) => {
  const res = await axios.put(`${API_URL}/cancelar`, { pedido, motivo_cancelamento }, { headers: getAuthHeader() });
  return res.data;
};

// Liberar edição
export const liberarEdicaoPedido = async (pedido, motivo_abertura, responsavel_abertura) => {
  const res = await axios.put(`${API_URL}/${pedido}/liberar-edicao`, { motivo_abertura, responsavel_abertura }, { headers: getAuthHeader() });
  return res.data;
};

// Registrar pagamento de pedido
export const pagarPedido = async (pedido, valor_pagamento, forma_pagamento) => {
  const res = await axios.post(`${API_URL}/${pedido}/pagar`, { valor_pagamento, forma_pagamento }, { headers: getAuthHeader() });
  return res.data;
};

// Registrar pagamento por cliente
export const pagarCliente = async (clienteNome, valor_pagamento, forma_pagamento) => {
  const res = await axios.post(`${API_URL}/cliente/${clienteNome}/pagar`, { valor_pagamento, forma_pagamento }, { headers: getAuthHeader() });
  return res.data;
};
