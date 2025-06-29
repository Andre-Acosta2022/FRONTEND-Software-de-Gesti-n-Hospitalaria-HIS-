// src/presentation/pages/PacientesPage.jsx
import React, { useState } from 'react';
import usePacientes from '@/presentation/hooks/usePacientes';
import useConfirmDialog from '@/presentation/hooks/useConfirmDialog.js';
import ConfirmDialog from '@/presentation/common/ConfirmDialog';
import Alert from '@/presentation/common/Alert';
import LoadingSpinner from '@/presentation/common/LoadingSpinner';
import { FaTrash, FaEdit, FaEye, FaSearch, FaUserInjured } from 'react-icons/fa';
import '@/presentation/styles/paciente/pacientePage.css';

const PacientesPage = () => {
  const { pacientes, loading, error, alert, setAlert, deletePaciente } = usePacientes();
  const { confirmDialog, openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    nombre: true,
    dni: true,
    seguro: false,
    ubicacion: false
  });

  // Filtrar pacientes según término de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredPacientes([]);
      return;
    }
    
    const results = pacientes.filter(paciente => {
      const matches = [];
      
      if (activeFilters.nombre) {
        matches.push(
          (paciente.nombre && paciente.nombre.toLowerCase().includes(term)) || 
          (paciente.apellidos && paciente.apellidos.toLowerCase().includes(term))
        );
      }
      
      if (activeFilters.dni) {
        matches.push(paciente.dni && paciente.dni.includes(term));
      }
      
      if (activeFilters.seguro) {
        matches.push(
          paciente.seguroMedico?.nombre && 
          paciente.seguroMedico.nombre.toLowerCase().includes(term)
        );
      }
      
      if (activeFilters.ubicacion) {
        matches.push(
          (paciente.direccion?.ciudad && paciente.direccion.ciudad.toLowerCase().includes(term)) || 
          (paciente.direccion?.provincia && paciente.direccion.provincia.toLowerCase().includes(term))
        );
      }
      
      return matches.some(match => match);
    });
    
    setFilteredPacientes(results);
  };

  const toggleFilter = (filterName) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleConfirmDelete = async () => {
    if (confirmDialog.patientId) {
      try {
        await deletePaciente(confirmDialog.patientId);
        setAlert({ show: true, type: "success", message: "Paciente eliminado correctamente." });
      } catch (error) {
        setAlert({ show: true, type: "error", message: "Error al eliminar el paciente." });
      } finally {
        closeConfirmDialog();
      }
    }
  };

  const displayedPacientes = searchTerm ? filteredPacientes : pacientes;

  if (loading) return <div className="loading-container"><LoadingSpinner size="large" /></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="paciente-container">
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      
      <div className="page-header">
        <h1><FaUserInjured /> Gestión de Pacientes</h1>
        <div className="header-actions">
          <div className="search-container">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="filter-options">
              <span>Buscar en:</span>
              <button 
                className={`filter-btn ${activeFilters.nombre ? 'active' : ''}`} 
                onClick={() => toggleFilter('nombre')}
              >
                Nombres
              </button>
              <button 
                className={`filter-btn ${activeFilters.dni ? 'active' : ''}`} 
                onClick={() => toggleFilter('dni')}
              >
                DNI
              </button>
              <button 
                className={`filter-btn ${activeFilters.seguro ? 'active' : ''}`} 
                onClick={() => toggleFilter('seguro')}
              >
                Seguro
              </button>
              <button 
                className={`filter-btn ${activeFilters.ubicacion ? 'active' : ''}`} 
                onClick={() => toggleFilter('ubicacion')}
              >
                Ubicación
              </button>
            </div>
          </div>
          <button className="add-button">
            + Nuevo Paciente
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="pacientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>DNI</th>
              <th>Edad</th>
              <th>Contacto</th>
              <th>Seguro Médico</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedPacientes.length === 0 ? (
              <tr className="no-results">
                <td colSpan="8">
                  {searchTerm ? 
                    "No se encontraron pacientes con esos criterios" : 
                    "No hay pacientes registrados"}
                </td>
              </tr>
            ) : (
              displayedPacientes.map(paciente => (
                <tr key={paciente.id}>
                  <td>{paciente.id}</td>
                  <td>
                    <div className="patient-name">
                      <div className="avatar-placeholder">
                        {paciente.nombre?.charAt(0) || 'N'}{paciente.apellidos?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <strong>{paciente.nombre || 'No especificado'} {paciente.apellidos || ''}</strong>
                        <div className="patient-email">{paciente.email || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td>{paciente.dni || 'No especificado'}</td>
                  <td>{paciente.edad || 'N/A'} años</td>
                  <td>
                    <div>{paciente.telefono || 'No especificado'}</div>
                    {paciente.contactoEmergencia && (
                      <div className="contact-info">{paciente.contactoEmergencia}</div>
                    )}
                  </td>
                  <td>
                    {paciente.seguroMedico ? (
                      <div className="seguro-info">
                        <strong>{paciente.seguroMedico.nombre}</strong>
                        <div>{paciente.seguroMedico.tipoSeguro}</div>
                      </div>
                    ) : (
                      <span className="no-seguro">Sin seguro</span>
                    )}
                  </td>
                  <td>
                    {paciente.direccion ? (
                      <div className="location-info">
                        <div>{paciente.direccion.ciudad}, {paciente.direccion.provincia}</div>
                        <div>{paciente.direccion.departamento}</div>
                      </div>
                    ) : (
                      <span className="no-ubicacion">No especificada</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn view-btn" title="Ver detalles">
                      <FaEye />
                    </button>
                    <button className="action-btn edit-btn" title="Editar">
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      title="Eliminar"
                      onClick={() => openConfirmDialog("¿Estás seguro de eliminar este paciente?", paciente.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {displayedPacientes.length > 0 && (
        <div className="pagination">
          <button className="pagination-btn">Anterior</button>
          <span className="page-info">Página 1 de 5</span>
          <button className="pagination-btn">Siguiente</button>
        </div>
      )}
      
      <ConfirmDialog
        isOpen={confirmDialog.show}
        title="Confirmar Eliminación"
        message={confirmDialog.message}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};

export default PacientesPage;