import api from "../api/api";

export const getAllClientes = async () => {
  try {
    const res = await api.get("/clientes");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar clientes" };
  }
};

export const createCliente = async (cliente) => {
  try {
    const res = await api.post("/clientes", cliente);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao criar cliente" };
  }
};
