// src/RegisterPackage.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPackage() {
  const [id, setId] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://segundo-examen.onrender.com/paquete', { id, estado });
      alert('Paquete registrado con éxito');
    } catch (error) {
      alert('Error al registrar el paquete');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID del paquete:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <label>
        Estado:
        <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
      </label>
      <button type="submit">Registrar Paquete</button>
    </form>
  );
}

export default RegisterPackage;
