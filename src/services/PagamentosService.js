import api from "../api/api";

export const getPagamentos = async () => {
  try {
    const res = await api.get("/pagamentos");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar pagamentos" };
  }
};

export const createPagamento = async (pagamento) => {
  try {
    const res = await api.post("/pagamentos", pagamento);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao criar pagamento" };
  }
};
