import axios from "axios";

const API_URL = "http://localhost:3000/vendas"; // rota do backend

// Abrir novo pedido
export const abrirPedido = async (cliente_nome) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_URL,
      { cliente_nome },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao abrir pedido:", error);
    throw error;
  }
};

// Editar itens do pedido
export const editarItensPedido = async (pedido, itens) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/${pedido}/itens`,
      { itens },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao editar itens do pedido:", error);
    throw error;
  }
};

// Liberar edição de um pedido
export const liberarEdicaoPedido = async (pedido, motivo_abertura, responsavel_abertura) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/${pedido}/liberar-edicao`,
      { motivo_abertura, responsavel_abertura },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao liberar edição:", error);
    throw error;
  }
};

// Cancelar pedido
export const cancelarPedido = async (pedido, motivo_cancelamento) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/cancelar`,
      { pedido, motivo_cancelamento },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    throw error;
  }
};

// Buscar detalhes de um pedido
export const buscarPedido = async (pedido) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${pedido}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    throw error;
  }
};
