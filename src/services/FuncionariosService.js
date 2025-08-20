import api from "../api/api";

export const getAllFuncionarios = async () => {
  try {
    const res = await api.get("/funcionarios");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar funcionários" };
  }
};

export const createFuncionario = async (funcionario) => {
  try {
    const res = await api.post("/funcionarios", funcionario);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao criar funcionário" };
  }
};
