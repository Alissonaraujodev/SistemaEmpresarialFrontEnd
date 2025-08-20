import api from "../api/api";

export const getRelatorioVendas = async () => {
  try {
    const res = await api.get("/relatorios");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar relatório" };
  }
};
