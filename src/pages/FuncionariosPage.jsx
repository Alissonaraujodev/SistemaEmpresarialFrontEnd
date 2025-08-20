import React, { useEffect, useState } from "react";
import { getAllFuncionarios } from "../services/FuncionariosService";

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const data = await getAllFuncionarios();
        setFuncionarios(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFuncionarios();
  }, []);

  return (
    <div>
      <h1>Funcionários</h1>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            {f.nome} | Email: {f.email} | Cargo: {f.cargo}
          </li>
        ))}
      </ul>
    </div>
  );
}
