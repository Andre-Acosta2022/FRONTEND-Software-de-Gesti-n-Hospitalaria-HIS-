
// src/presentation/components/medicos/MedicoForm.jsx
import React, { useState } from 'react';

const MedicoForm = ({ especialidades, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    especialidadId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      especialidadId: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="medico-form">
      <div className="medico-form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="medico-form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div className="medico-form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="medico-form-group">
        <label>Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="medico-form-group">
        <label>Especialidad</label>
        <select
          name="especialidadId"
          value={formData.especialidadId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar especialidad</option>
          {especialidades.map(esp => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="medico-submit-button">
        Registrar Médico
      </button>
    </form>
  );
};

export default MedicoForm;