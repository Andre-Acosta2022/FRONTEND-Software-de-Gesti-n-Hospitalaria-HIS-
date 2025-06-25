// services/clinica.service.ts
const API_URL = 'http://localhost:8082/api/citas'; // Cambia la URL según tu configuración

// Obtener todas las citas de un paciente
export const getCitas = async (pacienteId: number) => {
  try {
    const response = await fetch(`${API_URL}/paciente/${pacienteId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching citas:', error);
    throw error;
  }
};

// Obtener una cita por ID
export const getCitasById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cita:', error);
    throw error;
  }
};

// Crear una nueva cita
export const createCitas = async (citas: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citas),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating cita:', error);
    throw error;
  }
};

// Cancelar una cita
export const cancelarCita = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}/cancelar`, {
      method: 'PUT',
    });
    return response.ok;
  } catch (error) {
    console.error('Error canceling cita:', error);
    throw error;
  }
};

// Obtener horarios disponibles para un doctor
export const getHorariosDisponibles = async (doctorId: number, fecha: string) => {
  try {
    const response = await fetch(`${API_URL}/disponibilidad/doctor/${doctorId}/fecha/${fecha}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching horarios disponibles:', error);
    throw error;
  }
};
