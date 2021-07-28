module.export = {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_URL,
    "ssl-required": process.env.KEYCLOAK_SSL_REQUIRED,
    "resource": process.env.KEYCLOAK_RESOURCE,
    "public-client": process.env.KEYCLOAK_PUBLIC_CLIENT,
    "confidential-port": process.env.KEYCLOAK_CONFIDENTIAL_PORT
}