// src/pages/CaixaPage.jsx
import { useEffect, useState } from "react";
import { listarMovimentacoes, registrarMovimentacao } from "../api/caixaApi";

export default function CaixaPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [saldo, setSaldo] = useState(null);
  const [totais, setTotais] = useState({ entradas: 0, saidas: 0 });
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "entrada",
    observacoes: ""
  });
  const [filtro, setFiltro] = useState({
    start_date: "",
    end_date: ""
  });

  // Buscar movimentações
  const carregarDados = async (params = {}) => {
    try {
      const dados = await listarMovimentacoes(params);
      setMovimentacoes(dados.movimentacoes);
      setSaldo(dados.saldo_periodo);
      setTotais({
        entradas: dados.total_entradas_periodo,
        saidas: dados.total_saidas_periodo
      });
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Registrar nova movimentação
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarMovimentacao({
        ...form,
        valor: parseFloat(form.valor)
      });
      setForm({ descricao: "", valor: "", tipo: "entrada", observacoes: "" });
      carregarDados(filtro); // recarregar com filtro atual
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
    }
  };

  // Aplicar filtro
  const handleFiltrar = (e) => {
    e.preventDefault();
    carregarDados(filtro);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Caixa</h1>

      {/* Saldo e totais */}
      {saldo !== null && (
        <div>
          <h2>💰 Saldo Período: R$ {saldo}</h2>
          <p>Entradas: R$ {totais.entradas}</p>
          <p>Saídas: R$ {totais.saidas}</p>
        </div>
      )}

      {/* Filtro por período */}
      <form onSubmit={handleFiltrar} style={{ marginBottom: "20px" }}>
        <label>De: </label>
        <input
          type="date"
          value={filtro.start_date}
          onChange={(e) => setFiltro({ ...filtro, start_date: e.target.value })}
        />
        <label>Até: </label>
        <input
          type="date"
          value={filtro.end_date}
          onChange={(e) => setFiltro({ ...filtro, end_date: e.target.value })}
        />
        <button type="submit">Filtrar</button>
      </form>

      {/* Formulário nova movimentação */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
          required
        />
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input
          type="text"
          placeholder="Observações"
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
        />
        <button type="submit">Registrar</button>
      </form>

      {/* Tabela de movimentações */}
      <h3>📋 Movimentações</h3>
      {movimentacoes.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th>Data</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Valor (R$)</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m) => (
              <tr key={m.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{new Date(m.data_movimentacao).toLocaleDateString()}</td>
                <td>{m.tipo}</td>
                <td>{m.descricao}</td>
                <td>{parseFloat(m.valor).toFixed(2)}</td>
                <td>{m.observacoes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma movimentação encontrada.</p>
      )}
    </div>
  );
}
