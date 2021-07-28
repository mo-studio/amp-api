import cors from 'cors';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');
import dotenv from 'dotenv';

const env = require('dotenv');
dotenv.config();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
};

export default function configure(app: Express) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return app;
}
