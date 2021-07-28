import express from 'express';
import { loadRoutes } from './routes';
import configure from './express.config';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { PostgresDataService } from './services/data.service';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationError } from 'express-validation';
import Keycloak from 'keycloak-connect';
import { ormConfig } from '../ormconfig';
//import dotenv from 'dotenv';

//dotenv.config();

const app = configure(express());
app.use(cors());

// T536
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ limit: '50kb' }));

app.use(helmet());

app.set('trust proxy', 1); // for rate-limiting to not incriminate the proxy
// limit each IP to 100 requests per 15 min
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

const memoryStore = new session.MemoryStore();
const keycloakConfig: Keycloak.KeycloakConfig = {
  'confidential-port': process.env.KEYCLOAK_CONFIDENTIAL_PORT ?? '',
  'auth-server-url': process.env.KEYCLOAK_URL ?? '',
  resource: process.env.KEYCLOAK_RESOURCE ?? '',
  'ssl-required': process.env.KEYCLOAK_SSL_REQUIRED ?? '',
  realm: process.env.KEYCLOAK_REALM ?? '',
};
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(
  session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
  keycloak.middleware({
    logout: '/logout',
    admin: '/',
  })
);

loadRoutes(app, new PostgresDataService());

createConnection(ormConfig)
  .then((connection) => {})
  .catch((error) => console.log(error));

export default app.listen(3000, async function () {
  console.log('AMP API is listening on port 3000!');
});
