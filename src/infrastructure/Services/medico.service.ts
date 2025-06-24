// services/MedicoService.ts
const API_URL = 'http://localhost:8084/api/doctores'; // URL de la API de doctores

// Obtener todos los médicos
export const getMedicos = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data; // O ajusta según la estructura de respuesta de la API
  } catch (error) {
    console.error('Error fetching medicos:', error);
    throw error;
  }
};

// Obtener un médico por ID
export const getMedicoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medico:', error);
    throw error;
  }
};

// Crear un médico
export const createMedico = async (medico) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medico),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating medico:', error);
    throw error;
  }
};

// Eliminar un médico
export const deleteMedico = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting medico:', error);
    throw error;
  }
};