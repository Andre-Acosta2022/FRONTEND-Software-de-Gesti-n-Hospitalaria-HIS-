import axios from 'axios';

const axiosMedicos = axios.create({
  baseURL: 'http://localhost:8084/api/medicos',  // URL base del microservicio de médicos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosMedicos;