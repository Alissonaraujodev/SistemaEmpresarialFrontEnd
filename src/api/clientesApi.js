import api from "./api"; // seu arquivo api.js com a instância axios

export const listarClientes = async () => {
  const res = await api.get("/clientes");
  return res.data; // array de clientes
};

export const buscarCliente = async (id) => {
  const res = await api.get(`/clientes/${id}`);
  return res.data;
};

export const criarCliente = async (cliente) => {
  const res = await api.post("/clientes", cliente);
  return res.data;
};

export const atualizarCliente = async (id, cliente) => {
  const res = await api.put(`/clientes/${id}`, cliente);
  return res.data;
};

export const deletarCliente = async (id) => {
  const res = await api.delete(`/clientes/${id}`);
  return res.data;
};
