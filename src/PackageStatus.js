// src/PackageStatus.js
import React, { useState } from 'react';
import axios from 'axios';

function PackageStatus() {
  const [id, setId] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/paquete/${id})');
      setEstado(response.data.estado);
    } catch (error) {
      alert('Paquete no encontrado');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ID del paquete:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="submit">Obtener Estado</button>
      </form>
      {estado && <p>Estado del paquete: {estado}</p>}
    </div>
  );
}

export default PackageStatus;