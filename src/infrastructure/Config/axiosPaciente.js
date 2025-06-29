import axios from 'axios';

const axiosPaciente = axios.create({
  baseURL: 'http://localhost:8083/api/pacientes',  // URL base del microservicio de pacientes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPaciente;
