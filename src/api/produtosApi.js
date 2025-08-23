import api from "./api"; // conexão base axios (já configurada com URL base + token)

// 🔹 Listar todos os produtos ou buscar por nome/código
export const listarProdutos = async (search = "") => {
  try {
    const response = await api.get(`/produtos`, {
      params: { search },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Buscar produto por identificador (id, nome, código de barras ou referência)
export const buscarProduto = async (identificador) => {
  try {
    const response = await api.get(`/produtos/${identificador}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Criar novo produto
export const criarProduto = async (produto) => {
  try {
    const response = await api.post(`/produtos`, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Atualizar produto
export const atualizarProduto = async (identificador, produto) => {
  try {
    const response = await api.put(`/produtos/${identificador}`, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Excluir produto
export const deletarProduto = async (identificador) => {
  try {
    const response = await api.delete(`/produtos/${identificador}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error.response?.data || error.message);
    throw error;
  }
};
