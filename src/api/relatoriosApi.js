import axios from "axios";

const API_URL = "http://localhost:3000/relatorios"; // backend

// 🔹 Relatório de vendas gerais (com filtros opcionais)
export const getRelatorioVendas = async (filtros = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/vendas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filtros, // filtros: { start_date, end_date, status_pagamento, status_venda }
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar relatório de vendas:", error);
    throw error;
  }
};
