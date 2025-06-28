const API_URL = 'http://localhost:8080';

export const turnosService = {
  // Crear un nuevo turno
  crearTurno: async (turnoData) => {
    try {
      const response = await fetch(`${API_URL}/api/turnos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(turnoData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el turno');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearTurno:', error);
      throw error;
    }
  },

  // Actualizar estado de un turno
  actualizarEstadoTurno: async (turnoId, estado) => {
    try {
      const response = await fetch(`${API_URL}/api/turnos/${turnoId}/estado?estado=${estado}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el estado del turno');
      }
      return response.ok;
    } catch (error) {
      console.error('Error en actualizarEstadoTurno:', error);
      throw error;
    }
  },

  // Obtener todos los turnos para un mes específico
  obtenerTurnosPorMes: async (mes, año) => {
    try {
      const response = await fetch(`${API_URL}/api/turnos?mes=${mes}&año=${año}`);
      if (!response.ok) throw new Error('Error al obtener los turnos');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerTurnosPorMes:', error);
      throw error;
    }
  }
};