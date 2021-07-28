import request from 'supertest';
import configure from '../express.config';
import { loadRoutes } from '../routes';
import express from 'express';
import { Server } from 'http';

describe('UnitController', () => {
  let app: Server;
  let svc = jasmine.createSpyObj('DataService', ['getUnits', 'getAirmen']);

  beforeAll(() => {
    const e = configure(express());
    loadRoutes(e, svc);
    app = e.listen(300, () => {});
  });

  afterAll(() => {
    app.close();
  });

  afterEach(() => {
    svc.getUnits.calls.reset();
  });

  describe('getUnits', () => {
    it('calls DataService.getUnits', async () => {
      const result = { units: 'unit' };
      svc.getUnits.and.returnValue(result);
      await request(app)
        .get('/api/v1/base/1/units')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
      expect(svc.getUnits).toHaveBeenCalledWith(1);
    });
  });

  describe('getAirmen', () => {
    it('calls DataService.getAirmen', async () => {
      svc.getAirmen.and.returnValue({ airmen: 'airmen' });
      await request(app)
        .get('/api/v1/base/1/unit/1/users')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
      expect(svc.getAirmen).toHaveBeenCalledWith(1, 1);
    });
  });
});
