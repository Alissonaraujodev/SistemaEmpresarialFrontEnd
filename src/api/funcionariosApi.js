import api from "./api"; // seu axios já configurado com baseURL e interceptors

// Listar todos os funcionários
export const listarFuncionarios = async (search = "") => {
  const response = await api.get(`/funcionarios?search=${search}`);
  return response.data;
};

// Buscar um funcionário por ID ou CPF
export const buscarFuncionario = async (identificador) => {
  const response = await api.get(`/funcionarios/${identificador}`);
  return response.data;
};

// Criar funcionário
export const criarFuncionario = async (funcionario) => {
  const response = await api.post("/funcionarios", funcionario);
  return response.data;
};

// Atualizar funcionário
export const atualizarFuncionario = async (identificador, funcionario) => {
  const response = await api.put(`/funcionarios/${identificador}`, funcionario);
  return response.data;
};

// Deletar funcionário
export const deletarFuncionario = async (identificador) => {
  const response = await api.delete(`/funcionarios/${identificador}`);
  return response.data;
};
