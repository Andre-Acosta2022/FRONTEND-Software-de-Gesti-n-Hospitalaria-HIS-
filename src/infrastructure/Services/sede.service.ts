const API_URL = 'http://localhost:8081/api/clinicas'; // Cambia la URL según tu configuración

export const obtenerClinicas = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/clinicas`);
    if (!response.ok) throw new Error('Error al obtener clínicas');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerClinicas:', error);
    throw error;
  }
};

// Crear nueva clínica
export const crearClinica = async (clinicaData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/clinicas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clinicaData),
    });
    if (!response.ok) throw new Error('Error al crear clínica');
    return await response.json();
  } catch (error) {
    console.error('Error en crearClinica:', error);
    throw error;
  }
};

// Obtener sedes activas
export const obtenerSedesActivas = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/sedes/activas`);
    if (!response.ok) throw new Error('Error al obtener sedes activas');
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerSedesActivas:', error);
    throw error;
  }
};

// Crear nueva sede
export const crearSede = async (sedeData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/sedes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sedeData),
    });
    if (!response.ok) throw new Error('Error al crear sede');
    return await response.json();
  } catch (error) {
    console.error('Error en crearSede:', error);
    throw error;
  }
};

// Actualizar sede
export const actualizarSede = async (sedeId: number, sedeData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/sedes/${sedeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sedeData),
    });
    if (!response.ok) throw new Error('Error al actualizar sede');
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarSede:', error);
    throw error;
  }
};

// Eliminar sede
export const eliminarSede = async (sedeId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/sedes/${sedeId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar sede');
    return response.ok;
  } catch (error) {
    console.error('Error en eliminarSede:', error);
    throw error;
  }
};

// Verificar disponibilidad de una sede
export const verificarDisponibilidadSede = async (sedeId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/citas/sedes/${sedeId}/disponible`);
    if (!response.ok) throw new Error('Error al verificar disponibilidad');
    return await response.json();
  } catch (error) {
    console.error('Error en verificarDisponibilidadSede:', error);
    throw error;
  }
};

// Actualizar estado de una sede
export const actualizarEstadoSede = async (sedeId: number, nuevoEstado: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/sedes/${sedeId}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    if (!response.ok) throw new Error('Error al actualizar estado');
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarEstadoSede:', error);
    throw error;
  }
};