import request from 'supertest';
import configure from '../express.config';
import { loadRoutes } from '../routes';
import express from 'express';
import { Server } from 'http';

describe('UserController', () => {
  let app: Server;
  let svc = jasmine.createSpyObj('DataService', ['getUsers', 'createUser']);

  beforeAll(() => {
    const e = configure(express());
    loadRoutes(e, svc);
    app = e.listen(300, () => {});
  });

  afterAll(() => {
    app.close();
  });

  afterEach(() => {
    svc.getUsers.calls.reset();
  });

  describe('getUsers', () => {
    it('calls DataService.getUsers', async () => {
      svc.getUsers.and.returnValue({ users: { user: 'name' } });
      await request(app)
        .get('/api/v1/users')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });

  describe('createUser', () => {
    it('calls DataService.createUser', async () => {
      svc.createUser.and.returnValue({ user: 'name' });
      await request(app)
        .post('/api/v1/users')
        .expect(418)
        .expect('Content-Type', 'text/plain; charset=utf-8');
    });
  });
});
