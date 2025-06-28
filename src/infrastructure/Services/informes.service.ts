const API_URL = 'http://localhost:8080';

export const informesService = {
  // Crear un nuevo informe médico
  crearInforme: async (informeData) => {
    try {
      const response = await fetch(`${API_URL}/api/informes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(informeData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el informe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearInforme:', error);
      throw error;
    }
  },

  // Obtener detalles de una cita
  obtenerDetallesCita: async (citaId) => {
    try {
      const response = await fetch(`${API_URL}/api/citas/${citaId}`);
      if (!response.ok) throw new Error('Error al obtener detalles de la cita');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerDetallesCita:', error);
      throw error;
    }
  },

  // Obtener historial médico de un paciente
  obtenerHistorialPaciente: async (pacienteId) => {
    try {
      const response = await fetch(`${API_URL}/api/pacientes/${pacienteId}/historial`);
      if (!response.ok) throw new Error('Error al obtener historial del paciente');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerHistorialPaciente:', error);
      throw error;
    }
  },

  // Obtener datos de un doctor
  obtenerDatosDoctor: async (doctorId) => {
    try {
      const response = await fetch(`${API_URL}/api/doctores/${doctorId}`);
      if (!response.ok) throw new Error('Error al obtener datos del doctor');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerDatosDoctor:', error);
      throw error;
    }
  },

  // Buscar citas por DNI de paciente o fecha
  buscarCitas: async (filtro) => {
    try {
      let url = `${API_URL}/api/citas/buscar?`;
      if (filtro.dniPaciente) url += `dni=${filtro.dniPaciente}`;
      if (filtro.fecha) url += `&fecha=${filtro.fecha}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al buscar citas');
      return await response.json();
    } catch (error) {
      console.error('Error en buscarCitas:', error);
      throw error;
    }
  }
};