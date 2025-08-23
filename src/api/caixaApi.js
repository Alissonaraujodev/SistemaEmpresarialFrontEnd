// src/api/caixaApi.js
import api from "./api";

// Registrar movimentação
export const registrarMovimentacao = async (movimentacao) => {
  const response = await api.post("/caixa", movimentacao);
  return response.data;
};

// Listar movimentações (com ou sem período)
export const listarMovimentacoes = async (params = {}) => {
  const response = await api.get("/caixa", { params });
  return response.data;
};

// Ver saldo acumulado
export const getSaldoAcumulado = async () => {
  const response = await api.get("/caixa/saldo");
  return response.data;
};
