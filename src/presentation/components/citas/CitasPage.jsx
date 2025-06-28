import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ToggleSwitch from '@/presentation/components/ToggleSwitch';
import '@/presentation/styles/citas/CitasPage.css';

const CitasPage = () => {
  const [formData, setFormData] = useState({
    medicoId: '',
    medicoNombre: '',
    dniPaciente: '',
    paciente: null,
    descripcion: '',
    servicioId: '',
    sobreTurno: false,
    observaciones: '',
    montoTotal: 0,
    pago: false,
    fecha: '',
    hora: ''
  });
  
  const [medicos, setMedicos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar servicios disponibles
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await citasService.obtenerServicios();
        setServicios(data);
      } catch (err) {
        setError('Error al cargar servicios');
      }
    };
    
    fetchServicios();
  }, []);

  // Buscar médico por nombre
  const buscarMedico = async () => {
    if (!formData.medicoNombre) {
      setError('Ingrese nombre de médico');
      return;
    }
    
    try {
      setLoading(true);
      const data = await citasService.buscarMedicoPorNombre(formData.medicoNombre);
      setMedicos(data);
    } catch (err) {
      setError('Error al buscar médicos');
    } finally {
      setLoading(false);
    }
  };

  // Buscar paciente por DNI
  const buscarPaciente = async () => {
    if (!formData.dniPaciente) {
      setError('Ingrese DNI');
      return;
    }
    
    try {
      setLoading(true);
      const paciente = await citasService.buscarPacientePorDNI(formData.dniPaciente);
      setFormData(prev => ({ 
        ...prev, 
        paciente,
        pacienteId: paciente.id
      }));
    } catch (err) {
      setError('Paciente no encontrado');
    } finally {
      setLoading(false);
    }
  };

  // Ver disponibilidad del médico
  const verDisponibilidad = async () => {
    if (!formData.medicoId || !formData.fecha) {
      setError('Seleccione médico y fecha primero');
      return;
    }
    
    try {
      setLoading(true);
      const horarios = await citasService.obtenerDisponibilidadMedico(
        formData.medicoId,
        formData.fecha
      );
      setHorariosDisponibles(horarios);
    } catch (err) {
      setError('Error al obtener disponibilidad');
    } finally {
      setLoading(false);
    }
  };

  // Calcular monto cuando se selecciona un servicio
  useEffect(() => {
    const calcularMontoServicio = async () => {
      if (!formData.servicioId) return;
      
      try {
        const monto = await citasService.calcularMonto(formData.servicioId);
        setFormData(prev => ({ ...prev, montoTotal: monto }));
      } catch (err) {
        setError('Error al calcular monto');
      }
    };
    
    calcularMontoServicio();
  }, [formData.servicioId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!formData.medicoId || !formData.pacienteId || !formData.fecha || !formData.hora) {
      setError('Complete todos los campos obligatorios');
      return;
    }
    
    try {
      setLoading(true);
      await citasService.createCita({
        pacienteId: formData.pacienteId,
        doctorId: formData.medicoId,
        fecha: `${formData.fecha}T${formData.hora}:00`,
        descripcion: formData.descripcion,
        servicioId: formData.servicioId,
        sobreTurno: formData.sobreTurno,
        observaciones: formData.observaciones,
        monto: formData.montoTotal,
        pagado: formData.pago
      });
      
      // Éxito: resetear formulario
      setFormData({
        medicoId: '',
        medicoNombre: '',
        dniPaciente: '',
        paciente: null,
        pacienteId: '',
        descripcion: '',
        servicioId: '',
        sobreTurno: false,
        observaciones: '',
        montoTotal: 0,
        pago: false,
        fecha: '',
        hora: ''
      });
      setMedicos([]);
      setHorariosDisponibles([]);
      alert('Cita creada exitosamente!');
      
    } catch (err) {
      setError(err.message || 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='consulta'>
      <h1>Crear Consulta</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className='consulta__form'>
          {/* Médico and DNI input section */}
          <div className='consulta__input--section'>
            <div className='consulta__input--group'>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  name="medicoNombre"
                  placeholder="Médico" 
                  value={formData.medicoNombre}
                  onChange={handleChange}
                  disabled={loading}
                />
                <FaSearch 
                  onClick={buscarMedico} 
                  style={{ cursor: loading ? 'not-allowed' : 'pointer' }} 
                />
              </div>
              
              {medicos.length > 0 && (
                <select 
                  name="medicoId" 
                  value={formData.medicoId}
                  onChange={handleChange}
                  className="medico-select"
                  disabled={loading}
                >
                  <option value="">Seleccione médico</option>
                  {medicos.map(medico => (
                    <option key={medico.id} value={medico.id}>
                      {medico.nombreCompleto} - {medico.especialidad}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className='consulta__input--group'>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  name="dniPaciente"
                  placeholder='DNI del paciente' 
                  value={formData.dniPaciente}
                  onChange={handleChange}
                  disabled={loading}
                />
                <FaSearch 
                  onClick={buscarPaciente} 
                  style={{ cursor: loading ? 'not-allowed' : 'pointer' }} 
                />
              </div>
              
              {formData.paciente && (
                <div className="paciente-info">
                  <span>{formData.paciente.nombre} {formData.paciente.apellidos}</span>
                </div>
              )}
            </div>
          </div>

          {/* Fecha y hora */}
          <div className='consulta__input--section'>
            <div className='consulta__input--group'>
              <label>Fecha</label>
              <input 
                type="date" 
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                disabled={loading || !formData.medicoId}
              />
            </div>
            
            {horariosDisponibles.length > 0 && (
              <div className='consulta__input--group'>
                <label>Hora</label>
                <select 
                  name="hora" 
                  value={formData.hora}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Seleccione hora</option>
                  {horariosDisponibles.map(horario => (
                    <option key={horario} value={horario}>
                      {horario}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Description */}
          <div className='consulta__textarea--group'>
            <label htmlFor="descripcion">Descripción</label>
            <textarea 
              id="descripcion" 
              name="descripcion"
              placeholder="Detalles de la consulta"
              value={formData.descripcion}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
          </div>

          {/* Service Section */}
          <div className='consulta__input--group'>
            <label>Servicio</label>
            <select
              name="servicioId"
              value={formData.servicioId}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione servicio</option>
              {servicios.map(servicio => (
                <option key={servicio.id} value={servicio.id}>
                  {servicio.nombre} - S/ {servicio.precio?.toFixed(2) || '0.00'}
                </option>
              ))}
            </select>
          </div>

          {/* Sobre turno toggle */}
          <div className='consulta__checkbox--group'>
            <p>Sobre turno</p>
            <ToggleSwitch 
              isOn={formData.sobreTurno}
              handleToggle={() => setFormData(prev => ({ 
                ...prev, 
                sobreTurno: !prev.sobreTurno 
              }))}
              disabled={loading}
            />
          </div>

          {/* Doctor availability */}
          <div 
            className='doctor-availability' 
            onClick={verDisponibilidad}
            style={{ cursor: loading || !formData.medicoId || !formData.fecha ? 'not-allowed' : 'pointer' }}
          >
            <p>Ver disponibilidad del médico</p>
          </div>

          {/* Observations */}
          <div className='consulta__textarea--group'>
            <label htmlFor="observaciones">Observaciones</label>
            <textarea 
              id="observaciones" 
              name="observaciones"
              placeholder="Cualquier detalle adicional"
              value={formData.observaciones}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
          </div>

          {/* Total and Payment Section */}
          <div className='consulta__total--group'>
            <div className='consulta__total--group separade'>
              <p>Monto Total: </p>
              <p>{formData.montoTotal.toFixed(2)} Sol</p>
            </div>
            <div>
              <p>Pago</p>
              <ToggleSwitch 
                isOn={formData.pago}
                handleToggle={() => setFormData(prev => ({ 
                  ...prev, 
                  pago: !prev.pago 
                }))}
                disabled={loading}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className='button-group'>
            <button 
              type="button" 
              className='cancelar-button'
              onClick={() => window.history.back()}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className='agregar-button'
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Agregar Consulta'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CitasPage;