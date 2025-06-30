import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://your-keycloak-server-url/auth', // URL de tu servidor Keycloak
  realm: 'your-realm', // Tu realm de Keycloak
  clientId: 'your-client-id', // ID de tu cliente en Keycloak
});

export { keycloak };
