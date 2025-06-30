// infrastructure/Config/keycloak.js
import Keycloak from 'keycloak-js';

let keycloakInstance = null;

// Función para obtener la instancia de Keycloak
const getKeycloakInstance = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: 'http://localhost:8080/auth',  // URL del servidor Keycloak
      realm: 'clinica-realm',            // Nombre del realm configurado en Keycloak
      clientId: 'frontend-client',       // El cliente que configuraste en Keycloak
    });
  }
  return keycloakInstance;
};

// Exportar la instancia de Keycloak
export { getKeycloakInstance };
