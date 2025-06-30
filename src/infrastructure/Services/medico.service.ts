// src/services/medico.service.js
import axios from 'axios';

const MEDICOS_API_URL = 'http://localhost:8082/api/medicos';


export const getMedicos = async () => {
  try {
    const response = await axios.get(MEDICOS_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener médicos: ' + error.message);
  }
};

export const createMedico = async (medico) => {
  try {
    const response = await axios.post(MEDICOS_API_URL, medico);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear médico: ' + error.message);
  }
};

