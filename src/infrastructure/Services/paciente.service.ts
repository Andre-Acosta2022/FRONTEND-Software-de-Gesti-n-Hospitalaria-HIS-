// services/PacienteService.js
const API_URL = 'http://localhost:8080/api/pacientes'; // Cambia por la URL de tu backend

// Obtener todos los pacientes
export const getPacientes = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data; // O ajusta según la estructura de respuesta de la API
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw error;
  }
};

// Obtener un paciente por ID
export const getPacienteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching paciente:', error);
    throw error;
  }
};

// Crear un paciente
export const createPaciente = async (paciente) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating paciente:', error);
    throw error;
  }
};

// Actualizar un paciente
export const updatePaciente = async (id, paciente) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating paciente:', error);
    throw error;
  }
};

// Eliminar un paciente
export const deletePaciente = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting paciente:', error);
    throw error;
  }
};