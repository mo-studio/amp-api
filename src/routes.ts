import { Express } from 'express';
import { DataService } from './services/data.service';
import TaskController from './controllers/task.controller';
import ProgressController from './controllers/progress.controller';
import UnitController from './controllers/unit.controller';
import UserController from './controllers/user.controller';
import { validate } from 'express-validation';
import { taskValidation } from './entities/Task';
// import { keycloak } from './index';

export function loadRoutes(app: Express, dataService: DataService) {
  // controller injection
  const taskController = new TaskController(dataService);
  const progressController = new ProgressController(dataService);
  const unitController = new UnitController(dataService);
  const userController = new UserController(dataService);

  app.get('/api/v1/healthcheck', (req, res) => {
    console.log('healthcheck hit');
    res.send('ok');
  });

  // checklist and task routes
  app.get(
    '/api/v1/checklist/:userID',
    // keycloak.protect('realm:amp-user'),
    (req, res) => taskController.get(req, res)
  );
  app.get('/api/v1/categories/:ownerID', (req, res) =>
    taskController.getCategories(req, res)
  );
  app.post(
    '/api/v1/category/:categoryID/task',
    // keycloak.protect('realm:amp-admin'),
    validate(taskValidation, {}, {}),
    (req, res) => taskController.createTask(req, res)
  );
  app.put(
    '/api/v1/category/:categoryID/task/:taskID',
    // keycloak.protect('realm:amp-admin'),
    validate(taskValidation, {}, {}),
    (req, res) => taskController.updateTask(req, res)
  );
  app.delete(
    '/api/v1/category/:categoryID/task/:taskID',
    // keycloak.protect('realm:amp-admin'),
    (req, res) => taskController.deleteTask(req, res)
  );

  // progress routes
  app.get(
    '/api/v1/progress/:userID',
    // keycloak.protect('realm:amp-user'),
    (req, res) => progressController.getProgress(req, res)
  );
  app.put(
    '/api/v1/progress/:userID',
    // keycloak.protect('realm:amp-user'),
    (req, res) => progressController.updateProgress(req, res)
  );

  // user and unit routes
  app.post(
    '/api/v1/users',
    // keycloak.protect('realm:admin'),
    (req, res) => userController.createUser(req, res)
  );
  app.get(
    '/api/v1/users',
    // keycloak.protect('realm:admin'),
    (req, res) => userController.getUsers(req, res)
  );
  app.get(
    '/api/v1/base/:baseID/units',
    // keycloak.protect('realm:admin'),
    (req, res) => unitController.getUnits(req, res)
  );
  app.get(
    '/api/v1/base/:baseID/unit/:unitID/users',
    // keycloak.protect('realm:admin'),
    (req, res) => unitController.getAirmen(req, res)
  );
}
