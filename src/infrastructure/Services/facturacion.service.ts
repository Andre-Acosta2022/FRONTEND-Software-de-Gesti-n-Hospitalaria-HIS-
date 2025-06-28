const API_URL = 'http://localhost:8080';

export const pagosService = {
  // Crear un nuevo pago
  crearPago: async (pagoData) => {
    try {
      const response = await fetch(`${API_URL}/api/pagos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pagoData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el pago');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearPago:', error);
      throw error;
    }
  },

  // Obtener todos los pagos
  obtenerPagos: async () => {
    try {
      const response = await fetch(`${API_URL}/api/pagos`);
      if (!response.ok) throw new Error('Error al obtener los pagos');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPagos:', error);
      throw error;
    }
  },

  // Actualizar un pago
  actualizarPago: async (pagoId, pagoData) => {
    try {
      const response = await fetch(`${API_URL}/api/pagos/${pagoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pagoData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el pago');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en actualizarPago:', error);
      throw error;
    }
  },

  // Eliminar un pago
  eliminarPago: async (pagoId) => {
    try {
      const response = await fetch(`${API_URL}/api/pagos/${pagoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el pago');
      }
      return response.ok;
    } catch (error) {
      console.error('Error en eliminarPago:', error);
      throw error;
    }
  },

  // Obtener citas pendientes de pago
  obtenerCitasPendientesPago: async () => {
    try {
      const response = await fetch(`${API_URL}/api/citas/pendientes-pago`);
      if (!response.ok) throw new Error('Error al obtener citas pendientes de pago');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerCitasPendientesPago:', error);
      throw error;
    }
  },

  // Generar recibo de pago
  generarRecibo: async (pagoId) => {
    try {
      const response = await fetch(`${API_URL}/api/pagos/${pagoId}/recibo`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Error al generar el recibo');
      
      // Para este ejemplo, asumimos que la API devuelve un objeto con la URL del recibo
      // En un caso real, probablemente recibirías un PDF y lo manejarías diferente
      return await response.json();
    } catch (error) {
      console.error('Error en generarRecibo:', error);
      throw error;
    }
  }
};