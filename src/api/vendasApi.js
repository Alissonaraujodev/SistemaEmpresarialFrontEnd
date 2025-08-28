import api from "./api";

// ----------------- VENDAS -----------------

// Buscar todos os pedidos
export const getAllVendas = () => api.get("/vendas");

// Abrir pedido
export const abrirPedido = (cliente_nome) =>
  api.post("/vendas", { cliente_nome });

// Buscar pedido por ID
export const buscarPedido = (pedido) =>
  api.get(`/vendas/${pedido}`);

// Editar itens do pedido
export const editarItensPedido = (pedido, itens) =>
  api.put(`/vendas/${pedido}/itens`, { itens });

// Finalizar pedido
export const finalizarPedido = (pedido) =>
  api.put(`/vendas/${pedido}/finalizar`);

// Cancelar pedido
export const cancelarPedido = (pedido, motivo_cancelamento) =>
  api.put(`/vendas/cancelar`, { pedido, motivo_cancelamento });

// Liberar edição do pedido
export const liberarEdicaoPedido = (pedido, motivo_abertura, responsavel_abertura) =>
  api.put(`/vendas/${pedido}/liberar-edicao`, { motivo_abertura, responsavel_abertura });

// Registrar pagamento de pedido
export const pagarPedido = (pedido, valor_pagamento, forma_pagamento) =>
  api.post(`/vendas/${pedido}/pagar`, { valor_pagamento, forma_pagamento });

// Registrar pagamento por cliente
export const pagarCliente = (clienteNome, valor_pagamento, forma_pagamento) =>
  api.post(`/vendas/cliente/${clienteNome}/pagar`, { valor_pagamento, forma_pagamento });
