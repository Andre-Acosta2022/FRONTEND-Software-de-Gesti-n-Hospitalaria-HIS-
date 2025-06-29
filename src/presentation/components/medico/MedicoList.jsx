// src/presentation/components/medicos/MedicoList.jsx
import React from 'react';

const MedicoList = ({ medicos }) => {
  if (medicos.length === 0) {
    return <div className="medico-empty">No hay médicos registrados</div>;
  }

  return (
    <div className="medico-table-container">
      <table className="medico-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id}>
              <td>{medico.id}</td>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
              <td>{medico.especialidad?.nombre || 'N/A'}</td>
              <td>
                <div>{medico.email}</div>
                <div>{medico.telefono}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicoList;