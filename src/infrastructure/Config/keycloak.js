import Keycloak from 'keycloak-js';

// Crear una instancia de Keycloak
const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth', // URL del servidor de Keycloak
  realm: 'clinica-realm',           // Nombre del realm configurado en Keycloak
  clientId: 'frontend-client',      // El cliente que configuraste en Keycloak
});

// Exportar la instancia de Keycloak
export { keycloak };