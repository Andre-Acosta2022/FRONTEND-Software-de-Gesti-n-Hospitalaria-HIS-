// src/presentation/pages/MedicosPage.jsx
import React, { useState } from 'react';
import { useMedicos } from '@/presentation/hooks/useMedicos';

import LoadingSpinner from '@/presentation/common/LoadingSpinner';
import Alert from '@/presentation/common/Alert';
import '@/presentation/styles/medico/medicoPage.css';
// Página principal de médicos
const MedicosPage = () => {
  const { 
    medicos, 
    especialidades, 
    loading, 
    error, 
    addMedico, 
    showForm, 
    setShowForm,
    filters,
    handleFilterChange,
    setError
  } = useMedicos();

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    cmp: '',
    especialidadId: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addMedico(formData);
    if (success) {
      setSuccessMessage('Médico registrado exitosamente');
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        cmp: '',
        especialidadId: ''
      });
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccessMessage('');
  };

  return (
    <div className="medico-container">
      <h1>Administración de Médicos</h1>
      
      {error && <Alert type="error" message={error} onClose={clearError} />}
      {successMessage && <Alert type="success" message={successMessage} onClose={clearSuccess} />}
      
      <div className="filtros-container">
        <div className="filtro-group">
          <label>CMP</label>
          <input
            type="text"
            name="cmp"
            placeholder="Buscar por CMP"
            value={filters.cmp}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filtro-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Buscar por nombre o apellido"
            value={filters.nombre}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filtro-group">
          <label>Especialidad</label>
          <select
            name="especialidadId"
            value={filters.especialidadId}
            onChange={handleFilterChange}
          >
            <option value="">Todas las especialidades</option>
            {especialidades.map(esp => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="btn-agregar" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Agregar Médico'}
        </button>
      </div>
      
      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>Registrar Nuevo Médico</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="medico-form">
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Apellido *</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleFormChange}
              />
            </div>
            
            <div className="form-group">
              <label>CMP *</label>
              <input
                type="text"
                name="cmp"
                value={formData.cmp}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Especialidad *</label>
              <select
                name="especialidadId"
                value={formData.especialidadId}
                onChange={handleFormChange}
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
            
            <button type="submit" className="submit-btn">
              Registrar Médico
            </button>
          </form>
        </div>
      )}
      
      <div className="table-container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          medicos.length > 0 ? (
            <table className="medico-table">
              <thead>
                <tr>
                  <th>CMP</th>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Contacto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicos.map((medico) => (
                  <tr key={medico.id}>
                    <td>{medico.cmp}</td>
                    <td>{medico.nombre} {medico.apellido}</td>
                    <td>
                      {especialidades.find(e => e.id === medico.especialidadId)?.nombre || 'N/A'}
                    </td>
                    <td>
                      <div>{medico.email}</div>
                      <div>{medico.telefono}</div>
                    </td>
                    <td>
                      <button className="btn-action">Editar</button>
                      <button className="btn-action danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty">
              <p>No se encontraron médicos</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MedicosPage;