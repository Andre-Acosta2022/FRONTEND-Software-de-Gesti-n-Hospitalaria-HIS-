import axios from 'axios';
const ESPECIALIDADES_API_URL = 'http://localhost:8082/api/especialidades';

export const getEspecialidades = async () => {
  try {
    const response = await axios.get(ESPECIALIDADES_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener especialidades: ' + error.message);
  }
  
};
export const createEspecialidad = async (especialidad) => {
  try {
    const response = await axios.post(ESPECIALIDADES_API_URL, especialidad);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear especialidad: ' + error.message);
  }
};
export const deleteEspecialidad = async (id) => {
  try {
    const response = await axios.delete(`${ESPECIALIDADES_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar especialidad: ' + error.message);
  }
};