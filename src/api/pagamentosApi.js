import api from "./api"; // sua instância do axios configurada com baseURL e token

// Pagar pedido específico
export const pagarPedido = async (pedidoId, pagamento) => {
  const { data } = await api.post(`/pagamentos/${pedidoId}/pagar`, pagamento);
  return data;
};

// Pagar por cliente (dividir entre pedidos em aberto)
export const pagarCliente = async (clienteNome, pagamento) => {
  const { data } = await api.post(`/pagamentos/cliente/${clienteNome}/pagar`, pagamento);
  return data;
};

// Relatório do cliente
export const relatorioCliente = async (nome) => {
  const { data } = await api.get(`/pagamentos/${nome}/relatorio`);
  return data;
};

// Listar pagamentos de um cliente
export const listarPagamentosCliente = async (clienteNome) => {
  const { data } = await api.get(`/pagamentos/cliente/${clienteNome}`);
  return data;
};
