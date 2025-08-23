import { useEffect, useState } from "react";
import {
  listarFuncionarios,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
} from "../api/funcionariosApi";

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    cargo: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    ativo: 1
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await atualizarFuncionario(editando, form);
      } else {
        await criarFuncionario(form);
      }
      setForm({
        nome: "", cpf: "", email: "", telefone: "", senha: "", cargo: "",
        logradouro: "", numero: "", complemento: "", bairro: "",
        cidade: "", estado: "", cep: "", ativo: 1
      });
      setEditando(null);
      carregarFuncionarios();
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  const handleEdit = (func) => {
    setForm({ ...func, senha: "" });
    setEditando(func.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este funcionário?")) {
      try {
        await deletarFuncionario(id);
        carregarFuncionarios();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    }
  };

  return (
    <div>
      <h2>Gerenciar Funcionários</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
        {!editando && (
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        )}
        <input type="text" name="cargo" placeholder="Cargo" value={form.cargo} onChange={handleChange} required />

        <input type="text" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
        <input type="text" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
        <input type="text" name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
        <input type="text" name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
        <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
        <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} />
        <input type="text" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />

        <button type="submit">{editando ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <h3>Lista de Funcionários</h3>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            {f.nome} - {f.cargo} ({f.email})  
            <button onClick={() => handleEdit(f)}>Editar</button>
            <button onClick={() => handleDelete(f.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
