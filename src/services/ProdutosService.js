import api from "../api/api";

export const getAllProdutos = async () => {
  try {
    const res = await api.get("/produtos");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar produtos" };
  }
};

export const createProduto = async (produto) => {
  try {
    const res = await api.post("/produtos", produto);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao criar produto" };
  }
};
