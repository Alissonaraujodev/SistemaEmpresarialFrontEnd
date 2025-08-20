import api from "../api/api";

export const getAllVendas = async () => {
  try {
    const res = await api.get("/vendas");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar vendas" };
  }
};

export const createVenda = async (venda) => {
  try {
    const res = await api.post("/vendas", venda);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao criar venda" };
  }
};

