import api from "../api/api";

export const getMovimentacoesCaixa = async () => {
  try {
    const res = await api.get("/caixa");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar movimentações do caixa" };
  }
};
