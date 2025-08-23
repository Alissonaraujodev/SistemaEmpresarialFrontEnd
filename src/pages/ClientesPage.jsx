// src/pages/ClientesPage.jsx
import { useEffect, useState } from "react";
import { listarClientes, criarCliente, atualizarCliente, deletarCliente } from "../api/clientesApi";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cliente_nome: "",
    email: "",
    telefone: "",
  });
  const [editingId, setEditingId] = useState(null); // guarda o id do cliente que está sendo editado

  const carregarClientes = async () => {
    try {
      const dados = await listarClientes();
      setClientes(dados);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Atualizar cliente existente
        await atualizarCliente(editingId, form);
        setEditingId(null);
      } else {
        // Criar novo cliente
        await criarCliente(form);
      }
      setForm({ cliente_nome: "", email: "", telefone: "" });
      carregarClientes();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleEdit = (cliente) => {
    setForm({
      cliente_nome: cliente.cliente_nome,
      email: cliente.email,
      telefone: cliente.telefone,
    });
    setEditingId(cliente.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await deletarCliente(id);
      carregarClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Clientes</h1>

      {/* Formulário para criar/editar */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={form.cliente_nome}
          onChange={(e) => setForm({ ...form, cliente_nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
        />
        <button type="submit">{editingId ? "Atualizar" : "Adicionar"}</button>
        {editingId && (
          <button type="button" onClick={() => { setForm({ cliente_nome: "", email: "", telefone: "" }); setEditingId(null); }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de clientes */}
      {clientes.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.cliente_nome}</td>
                <td>{c.email || "-"}</td>
                <td>{c.telefone || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Editar</button>
                  <button onClick={() => handleDelete(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
}
