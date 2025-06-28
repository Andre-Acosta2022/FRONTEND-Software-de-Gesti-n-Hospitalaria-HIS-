import React, { useState, useEffect } from 'react';
import { FaSearch, FaFileMedicalAlt, FaUserInjured, FaUserMd } from 'react-icons/fa';
import '@/presentation/styles/informes/informes.css';

const InformesPage = () => {
  const [formData, setFormData] = useState({
    citaId: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    recomendaciones: ''
  });
  const [citas, setCitas] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState({
    dniPaciente: '',
    fecha: ''
  });

  // Buscar citas al cambiar los criterios de búsqueda
  useEffect(() => {
    if (busqueda.dniPaciente || busqueda.fecha) {
      buscarCitas();
    }
  }, [busqueda]);

  const buscarCitas = async () => {
    try {
      setLoading(true);
      const citasEncontradas = await informesService.buscarCitas(busqueda);
      setCitas(citasEncontradas);
    } catch (err) {
      setError('Error al buscar citas');
    } finally {
      setLoading(false);
    }
  };

  // Al seleccionar una cita, cargar detalles
  const seleccionarCita = async (citaId) => {
    try {
      setLoading(true);
      setError('');
      
      // Obtener detalles de la cita
      const cita = await informesService.obtenerDetallesCita(citaId);
      setCitaSeleccionada(cita);
      setFormData(prev => ({ ...prev, citaId: cita.id }));
      
      // Obtener datos del paciente y su historial
      const pacienteData = await informesService.obtenerHistorialPaciente(cita.pacienteId);
      setPaciente(pacienteData.paciente);
      setHistorial(pacienteData.historial);
      
      // Obtener datos del doctor
      const doctorData = await informesService.obtenerDatosDoctor(cita.doctorId);
      setDoctor(doctorData);
      
    } catch (err) {
      setError(err.message || 'Error al cargar detalles de la cita');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en la búsqueda
  const handleBusquedaChange = (e) => {
    const { name, value } = e.target;
    setBusqueda(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.citaId) {
      setError('Seleccione una cita primero');
      return;
    }
    
    try {
      setLoading(true);
      await informesService.crearInforme(formData);
      alert('Informe creado exitosamente!');
      // Resetear formulario después de éxito
      setFormData({
        citaId: '',
        diagnostico: '',
        tratamiento: '',
        observaciones: '',
        recomendaciones: ''
      });
      setCitaSeleccionada(null);
      setPaciente(null);
      setDoctor(null);
      setHistorial([]);
    } catch (err) {
      setError(err.message || 'Error al crear el informe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="informes-container">
      <h1><FaFileMedicalAlt /> Generar Informe Médico</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="informes-content">
        {/* Sección de búsqueda de citas */}
        <div className="busqueda-section">
          <h2>Seleccionar Cita</h2>
          <div className="busqueda-form">
            <div className="form-group">
              <label>DNI del Paciente</label>
              <input
                type="text"
                name="dniPaciente"
                value={busqueda.dniPaciente}
                onChange={handleBusquedaChange}
                placeholder="Ingrese DNI del paciente"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Fecha de Cita</label>
              <input
                type="date"
                name="fecha"
                value={busqueda.fecha}
                onChange={handleBusquedaChange}
                disabled={loading}
              />
            </div>
            <button 
              className="btn-buscar"
              onClick={buscarCitas}
              disabled={loading}
            >
              <FaSearch /> Buscar Citas
            </button>
          </div>
          
          {citas.length > 0 && (
            <div className="citas-list">
              <h3>Citas encontradas:</h3>
              <ul>
                {citas.map(cita => (
                  <li 
                    key={cita.id} 
                    className={citaSeleccionada?.id === cita.id ? 'selected' : ''}
                    onClick={() => seleccionarCita(cita.id)}
                  >
                    <div><strong>ID:</strong> {cita.id}</div>
                    <div><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleString()}</div>
                    <div><strong>Paciente:</strong> {cita.pacienteNombre}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Información de la cita seleccionada */}
        {citaSeleccionada && (
          <div className="detalles-section">
            <div className="detalles-cita">
              <h2>Detalles de la Cita</h2>
              <div className="detalle-item">
                <strong>Fecha:</strong> {new Date(citaSeleccionada.fecha).toLocaleString()}
              </div>
              <div className="detalle-item">
                <strong>Motivo:</strong> {citaSeleccionada.motivo}
              </div>
              <div className="detalle-item">
                <strong>Estado:</strong> {citaSeleccionada.estado}
              </div>
            </div>
            
            {/* Información del paciente */}
            <div className="paciente-info">
              <h3><FaUserInjured /> Paciente</h3>
              {paciente ? (
                <>
                  <div><strong>Nombre:</strong> {paciente.nombre} {paciente.apellidos}</div>
                  <div><strong>DNI:</strong> {paciente.dni}</div>
                  <div><strong>Edad:</strong> {paciente.edad} años</div>
                  <div><strong>Teléfono:</strong> {paciente.telefono}</div>
                  
                  <div className="historial-section">
                    <h4>Historial Médico</h4>
                    {historial.length > 0 ? (
                      <ul>
                        {historial.map((item, index) => (
                          <li key={index}>
                            <div><strong>Fecha:</strong> {new Date(item.fecha).toLocaleDateString()}</div>
                            <div><strong>Diagnóstico:</strong> {item.diagnostico}</div>
                            <div><strong>Tratamiento:</strong> {item.tratamiento}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay historial médico registrado.</p>
                    )}
                  </div>
                </>
              ) : (
                <p>Cargando datos del paciente...</p>
              )}
            </div>
            
            {/* Información del doctor */}
            <div className="doctor-info">
              <h3><FaUserMd /> Médico Tratante</h3>
              {doctor ? (
                <>
                  <div><strong>Nombre:</strong> Dr. {doctor.nombreCompleto}</div>
                  <div><strong>Especialidad:</strong> {doctor.especialidad}</div>
                  <div><strong>CMP:</strong> {doctor.cmp}</div>
                </>
              ) : (
                <p>Cargando datos del médico...</p>
              )}
            </div>
          </div>
        )}
        
        {/* Formulario del informe */}
        <form onSubmit={handleSubmit} className="informe-form">
          <h2>Detalles del Informe Médico</h2>
          
          <div className="form-group">
            <label>Diagnóstico</label>
            <textarea
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              required
              disabled={loading || !citaSeleccionada}
              rows={4}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Tratamiento Indicado</label>
            <textarea
              name="tratamiento"
              value={formData.tratamiento}
              onChange={handleChange}
              required
              disabled={loading || !citaSeleccionada}
              rows={4}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              disabled={loading || !citaSeleccionada}
              rows={3}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Recomendaciones</label>
            <textarea
              name="recomendaciones"
              value={formData.recomendaciones}
              onChange={handleChange}
              disabled={loading || !citaSeleccionada}
              rows={3}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading || !citaSeleccionada}
          >
            {loading ? 'Generando...' : 'Generar Informe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InformesPage;