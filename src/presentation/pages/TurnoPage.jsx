import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight, BsPlusCircle } from 'react-icons/bs';
import '@/presentation/styles/turno/turno.css';

const TurnosPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [turnos, setTurnos] = useState([]);
  const [formData, setFormData] = useState({
    fecha: formatDate(today),
    lugar: '',
    estado: 'DISPONIBLE'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Formatear fecha a YYYY-MM-DD
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Cargar turnos al iniciar y al cambiar mes/año
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setLoading(true);
        const response = await turnosService.obtenerTurnosPorMes(month + 1, year);
        setTurnos(response);
      } catch (err) {
        setError('Error al cargar turnos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTurnos();
  }, [month, year]);

  // Función para obtener los días del mes
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Función para obtener el nombre del mes
  const getMonthName = (month) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  };

  // Cambiar mes
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      if (month === 0) setYear((prevYear) => prevYear - 1);
    } else if (direction === 'next') {
      setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
      if (month === 11) setYear((prevYear) => prevYear + 1);
    }
  };

  // Filtro por semana
  const getWeeks = (days) => {
    let weeks = [];
    let week = [];
    
    // Agregar días vacíos al principio si es necesario
    const firstDay = days[0].getDay();
    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }
    
    days.forEach((day) => {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    
    // Agregar días vacíos al final si es necesario
    while (week.length < 7) {
      week.push(null);
    }
    
    if (week.length) weeks.push(week);
    return weeks;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const weeks = getWeeks(daysInMonth);

  // Obtener turnos para un día específico
  const getTurnosForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return turnos.filter(turno => turno.fecha === dateStr);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      const nuevoTurno = await turnosService.crearTurno(formData);
      setTurnos(prev => [...prev, nuevoTurno]);
      setFormData({
        fecha: formatDate(today),
        lugar: '',
        estado: 'DISPONIBLE'
      });
      setShowForm(false);
      alert('Turno creado exitosamente!');
    } catch (err) {
      setError(err.message || 'Error al crear el turno');
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de un turno
  const cambiarEstadoTurno = async (turnoId, nuevoEstado) => {
    try {
      setLoading(true);
      await turnosService.actualizarEstadoTurno(turnoId, nuevoEstado);
      setTurnos(prev => 
        prev.map(turno => 
          turno.id === turnoId ? { ...turno, estado: nuevoEstado } : turno
        )
      );
    } catch (err) {
      setError('Error al actualizar el estado del turno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="turnos-container">
      <div className="turnos-header">
        <h1>Gestión de Turnos Médicos</h1>
        <button 
          className="btn-new" 
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
        >
          <BsPlusCircle /> {showForm ? 'Cancelar' : 'Nuevo Turno'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {/* Formulario para crear turnos */}
      {showForm && (
        <form onSubmit={handleSubmit} className="turno-form">
          <h2>Crear Nuevo Turno</h2>
          
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Lugar</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              placeholder="Ej: Consultorio 1, Sala de Operaciones"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Estado Inicial</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="OCUPADO">Ocupado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setShowForm(false)}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Turno'}
            </button>
          </div>
        </form>
      )}
      
      {/* Calendario de turnos */}
      <div className="calendar-container">
        <div className="calendar-header">
          <h2 className="calendar-title">
            {getMonthName(month)} {year}
          </h2>
          <div className="calendar-controls">
            <button
              className="calendar-nav"
              onClick={() => handleMonthChange('prev')}
              disabled={loading}
            >
              <BsChevronLeft />
            </button>
            <button
              className="calendar-nav"
              onClick={() => handleMonthChange('next')}
              disabled={loading}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>

        {/* Encabezados de días de la semana */}
        <div className="calendar-grid-header">
          <div className="calendar-day-header">Dom</div>
          <div className="calendar-day-header">Lun</div>
          <div className="calendar-day-header">Mar</div>
          <div className="calendar-day-header">Mié</div>
          <div className="calendar-day-header">Jue</div>
          <div className="calendar-day-header">Vie</div>
          <div className="calendar-day-header">Sáb</div>
        </div>

        {/* Semanas del mes */}
        <div className="calendar-weeks">
          {weeks.map((week, index) => (
            <div key={index} className="calendar-week">
              {week.map((day, dayIndex) => {
                const turnosDia = day ? getTurnosForDate(day) : [];
                const isToday = day && day.toDateString() === today.toDateString();
                
                return (
                  <div 
                    key={dayIndex} 
                    className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <div className="calendar-date">
                          {day.getDate()}
                          {isToday && <span className="today-badge">Hoy</span>}
                        </div>
                        
                        {turnosDia.length > 0 && (
                          <div className="turnos-indicators">
                            {turnosDia.map(turno => (
                              <div 
                                key={turno.id} 
                                className={`turno-indicator ${turno.estado.toLowerCase()}`}
                                title={`${turno.lugar} - ${turno.estado}`}
                              >
                                {turno.lugar.substring(0, 1)}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Controles de mes y año */}
        <div className="calendar-filters">
          <div className="filter-group">
            <label>Mes:</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              disabled={loading}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {getMonthName(i)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Año:</label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              disabled={loading}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={year - 5 + i}>
                  {year - 5 + i}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Detalles de turnos para el día seleccionado */}
      <div className="turnos-details">
        <h2>Turnos para el {selectedDate.toLocaleDateString()}</h2>
        
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : getTurnosForDate(selectedDate).length === 0 ? (
          <div className="no-turnos">No hay turnos programados para este día</div>
        ) : (
          <div className="turnos-list">
            {getTurnosForDate(selectedDate).map(turno => (
              <div key={turno.id} className={`turno-card ${turno.estado.toLowerCase()}`}>
                <div className="turno-info">
                  <div className="turno-lugar">{turno.lugar}</div>
                  <div className="turno-estado">{turno.estado}</div>
                </div>
                
                <div className="turno-actions">
                  <select
                    value={turno.estado}
                    onChange={(e) => cambiarEstadoTurno(turno.id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="OCUPADO">Ocupado</option>
                    <option value="CANCELADO">Cancelado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TurnosPage;