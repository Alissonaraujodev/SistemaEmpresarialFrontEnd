import api from "../api/api";

// 🔹 Listar todos os produtos ou buscar por nome/código
export const listarProdutos = async (search = "") => {
  try {
    const res = await api.get("/produtos", {
      params: { search },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar produtos" };
  }
};

// 🔹 Buscar produto por identificador (id, nome, código de barras ou referência)
export const buscarProduto = async (identificador) => {
  try {
    const res = await api.get(`/produtos/${identificador}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao buscar produto" };
  }
};

// 🔹 Criar novo produto
export const criarProduto = async (produto) => {
  try {
    const res = await api.post("/produtos", produto);
    return res.data;
  } catch (err) {
    // Captura a mensagem de erro específica do backend
    throw err.response?.data || { message: "Erro ao criar produto" };
  }
};

// 🔹 Atualizar produto
export const atualizarProduto = async (identificador, produto) => {
  try {
    const res = await api.put(`/produtos/${identificador}`, produto);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao atualizar produto" };
  }
};

// 🔹 Excluir produto
export const deletarProduto = async (identificador) => {
  try {
    const res = await api.delete(`/produtos/${identificador}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Erro ao excluir produto" };
  }
};