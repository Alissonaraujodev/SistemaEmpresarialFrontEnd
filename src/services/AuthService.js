import api from "../api/api";

export const login = async (email, senha) => {
  try {
    const res = await api.post("/auth/login", { email, senha });
    return res.data; // contém token e usuário
  } catch (err) {
    throw err.response?.data || { message: "Erro no login" };
  }
};