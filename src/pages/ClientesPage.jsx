import React, { useEffect, useState } from "react";
import { getAllClientes } from "../services/ClientesService";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getAllClientes();
        setClientes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((c) => (
          <li key={c.id}>{c.cliente_nome}</li>
        ))}
      </ul>
    </div>
  );
}
