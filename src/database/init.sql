CREATE USER amp_airman WITH password 'admin';
DROP DATABASE IF EXISTS amp;
DROP DATABASE IF EXISTS keycloak;
CREATE DATABASE amp;
CREATE DATABASE keycloak;
GRANT ALL PRIVILEGES ON DATABASE amp TO amp_airman;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO amp_airman;

\c amp
\c keycloak
