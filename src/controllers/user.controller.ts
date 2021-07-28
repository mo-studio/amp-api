import { Request, Response } from 'express';
import { DataService } from '../services/data.service';

class UserController {
  private _dataService: DataService;
  constructor(dataService: DataService) {
    this._dataService = dataService;
  }

  async getUsers(req: Request, res: Response) {
    console.log(`GET Users`);
    try {
      const users = await this._dataService.getUsers();
      console.log('GET users succeeded:', JSON.stringify(users, null, 2));
      res.json({ users: users });
    } catch (e) {
      console.error('Unable to GET users:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  async createUser(req: Request, res: Response) {
    // const userParams = ...
    try {
      // todo 1 -- create user in keycloak, get id in response
      // const keycloakResult = await this._dataService.createKeycloakUser(...);
      // todo 2 -- create user in postgres, with keycloak id field set
      // const result = await this._dataService.createUser(...);

      // console.log('Get units succeeded:', JSON.stringify(result, null, 2));
      // res.json(result);
      res.sendStatus(418);
    } catch (e) {
      console.error('Unable to get units:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }
}

export default UserController;
