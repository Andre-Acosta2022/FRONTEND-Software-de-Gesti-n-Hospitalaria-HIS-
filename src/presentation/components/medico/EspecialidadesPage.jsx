// src/presentation/components/medicos/EspecialidadesPanel.jsx
import React from 'react';

const EspecialidadesPage = ({ especialidades }) => {
  return (
    <div className="especialidades-container">
      <h2>Especialidades Médicas</h2>
      <div className="especialidades-grid">
        {especialidades.map(especialidad => (
          <div key={especialidad.id} className="especialidades-card">
            <div className="especialidades-card-content">
              <h3>{especialidad.nombre}</h3>
              <span className="especialidades-count">ID: {especialidad.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EspecialidadesPage;