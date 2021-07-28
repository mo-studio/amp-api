import request from 'supertest';
import configure from '../express.config';
import { loadRoutes } from '../routes';
import express from 'express';
import { Server } from 'http';

describe('ProgressController', () => {
  let app: Server;
  let svc = jasmine.createSpyObj('DataService', [
    'getProgress',
    'updateProgress',
  ]);

  beforeAll(() => {
    const e = configure(express());
    loadRoutes(e, svc);
    app = e.listen(300, () => {});
  });

  afterAll(() => {
    app.close();
  });

  afterEach(() => {
    svc.getProgress.calls.reset();
  });

  describe('getProgress', () => {
    it('calls DataService.getProgress', async () => {
      svc.getProgress.and.returnValue({ testTask: 'testProgress' });
      await request(app)
        .get('/api/v1/progress/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
      expect(svc.getProgress).toHaveBeenCalledWith(1);
    });
  });

  describe('updateProgress', () => {
    it('calls DataService.updateProgress', async () => {
      const progress = { userID: 1, testTaskID: 4, testStatus: 'testProgress' };
      svc.updateProgress.and.returnValue(progress);
      svc.getProgress.and.returnValue(progress);
      await request(app)
        .put('/api/v1/progress/1')
        .send('4')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });
});
