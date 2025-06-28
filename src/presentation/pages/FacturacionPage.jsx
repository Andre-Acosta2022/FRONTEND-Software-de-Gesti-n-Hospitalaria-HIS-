import React, { useState, useEffect } from 'react';
import { FaSearch, FaMoneyBillWave, FaFileInvoice, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import '@/presentation/styles/facturacion/facturacion.css';

const FacturacionPage = () => {
  const [formData, setFormData] = useState({
    citaId: '',
    monto: '',
    metodoPago: 'EFECTIVO',
    referencia: '',
    estado: 'COMPLETADO'
  });
  const [pagos, setPagos] = useState([]);
  const [citasPendientes, setCitasPendientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPagoId, setCurrentPagoId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar pagos y citas pendientes al inicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulación de llamadas a la API
        const pagosData = await pagosService.obtenerPagos();
        const citasData = await pagosService.obtenerCitasPendientesPago();
        
        setPagos(pagosData);
        setCitasPendientes(citasData);
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar pagos basado en el término de búsqueda
  const filteredPagos = pagos.filter(pago => 
    pago.citaId.toString().includes(searchTerm) ||
    (pago.pacienteNombre && pago.pacienteNombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    pago.metodoPago.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear o actualizar pago
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      if (isEditing) {
        // Actualizar pago existente
        const updatedPago = await pagosService.actualizarPago(currentPagoId, formData);
        setPagos(prev => prev.map(p => p.id === currentPagoId ? updatedPago : p));
      } else {
        // Crear nuevo pago
        const newPago = await pagosService.crearPago(formData);
        setPagos(prev => [...prev, newPago]);
        
        // Actualizar lista de citas pendientes
        setCitasPendientes(prev => prev.filter(c => c.id !== formData.citaId));
      }
      
      // Resetear formulario
      resetForm();
    } catch (err) {
      setError(err.message || 'Error al guardar el pago');
    } finally {
      setLoading(false);
    }
  };

  // Editar un pago existente
  const handleEdit = (pago) => {
    setFormData({
      citaId: pago.citaId,
      monto: pago.monto,
      metodoPago: pago.metodoPago,
      referencia: pago.referencia || '',
      estado: pago.estado
    });
    setIsEditing(true);
    setCurrentPagoId(pago.id);
    setShowForm(true);
  };

  // Eliminar un pago
  const handleDelete = async (pagoId) => {
    if (!window.confirm('¿Está seguro de eliminar este pago?')) return;
    
    try {
      setLoading(true);
      await pagosService.eliminarPago(pagoId);
      setPagos(prev => prev.filter(p => p.id !== pagoId));
    } catch (err) {
      setError('Error al eliminar el pago');
    } finally {
      setLoading(false);
    }
  };

  // Generar recibo
  const generarRecibo = async (pagoId) => {
    try {
      setLoading(true);
      const recibo = await pagosService.generarRecibo(pagoId);
      // Aquí normalmente abrirías el PDF en una nueva ventana o lo descargarías
      window.open(recibo.url, '_blank');
    } catch (err) {
      setError('Error al generar el recibo');
    } finally {
      setLoading(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      citaId: '',
      monto: '',
      metodoPago: 'EFECTIVO',
      referencia: '',
      estado: 'COMPLETADO'
    });
    setIsEditing(false);
    setCurrentPagoId(null);
    setShowForm(false);
  };

  return (
    <div className="pagos-container">
      <div className="pagos-header">
        <h1><FaMoneyBillWave /> Gestión de Pagos</h1>
        <button 
          className="btn-new" 
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
        >
          <FaPlus /> {showForm ? 'Cancelar' : 'Nuevo Pago'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {/* Formulario para crear/editar pagos */}
      {showForm && (
        <form onSubmit={handleSubmit} className="pago-form">
          <h2>{isEditing ? 'Editar Pago' : 'Registrar Nuevo Pago'}</h2>
          
          <div className="form-group">
            <label>Cita</label>
            <select
              name="citaId"
              value={formData.citaId}
              onChange={handleChange}
              required
              disabled={isEditing || loading}
            >
              <option value="">Seleccionar cita</option>
              {citasPendientes.map(cita => (
                <option key={cita.id} value={cita.id}>
                  {cita.pacienteNombre} - {new Date(cita.fecha).toLocaleDateString()} - S/ {cita.monto.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Monto (S/)</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Método de Pago</label>
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA_CREDITO">Tarjeta de Crédito</option>
              <option value="TARJETA_DEBITO">Tarjeta de Débito</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="YAPE">Yape</option>
              <option value="PLIN">Plin</option>
            </select>
          </div>
          
          {formData.metodoPago !== 'EFECTIVO' && (
            <div className="form-group">
              <label>Referencia / Número de Operación</label>
              <input
                type="text"
                name="referencia"
                value={formData.referencia}
                onChange={handleChange}
                required={formData.metodoPago !== 'EFECTIVO'}
                disabled={loading}
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="COMPLETADO">Completado</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="CANCELADO">Cancelado</option>
              <option value="REEMBOLSADO">Reembolsado</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={resetForm}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Registrar')}
            </button>
          </div>
        </form>
      )}
      
      {/* Búsqueda */}
      <div className="search-section">
        <div className="input-with-icon">
          <input
            type="text"
            placeholder="Buscar pagos por cita, paciente o método..."
            value={searchTerm}
            onChange={handleSearch}
            disabled={loading}
          />
          <FaSearch />
        </div>
      </div>
      
      {/* Listado de pagos */}
      <div className="pagos-list">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando pagos...</p>
          </div>
        ) : filteredPagos.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron pagos</p>
          </div>
        ) : (
          <table className="pagos-table">
            <thead>
              <tr>
                <th>ID Cita</th>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Referencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPagos.map(pago => (
                <tr key={pago.id} className={`pago-row ${pago.estado.toLowerCase()}`}>
                  <td>{pago.citaId}</td>
                  <td>{pago.pacienteNombre}</td>
                  <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                  <td>S/ {pago.monto.toFixed(2)}</td>
                  <td>{pago.metodoPago}</td>
                  <td>{pago.referencia || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${pago.estado.toLowerCase()}`}>
                      {pago.estado}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="btn-action btn-recibo"
                      onClick={() => generarRecibo(pago.id)}
                      title="Generar recibo"
                    >
                      <FaFileInvoice />
                    </button>
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => handleEdit(pago)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(pago.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FacturacionPage;