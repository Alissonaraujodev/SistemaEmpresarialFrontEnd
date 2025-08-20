import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    api.get("/funcionarios")
      .then(res => setFuncionarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {funcionarios.map(f => (
          <li key={f.id}>{f.nome} - {f.cargo}</li>
        ))}
      </ul>
    </div>
  );
}
