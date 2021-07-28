import request from 'supertest';
import configure from '../express.config';
import { loadRoutes } from '../routes';
import express from 'express';
import { Server } from 'http';

describe('TaskController', () => {
  let app: Server;
  let svc = jasmine.createSpyObj('DataService', [
    'getUser',
    'getChecklist',
    'getTasks',
    'getCategories',
    'createTask',
    'updateTask',
    'saveTask',
    'updateTask',
    'deleteTask',
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
    svc.getChecklist.calls.reset();
  });

  describe('getChecklist', () => {
    it('calls DataService.getChecklist', async () => {
      svc.getChecklist.and.returnValue(Promise.resolve([{ id: 1 }]));
      svc.getUser.and.returnValue(Promise.resolve([{ id: 1 }]));
      svc.getCategories.and.returnValue(Promise.resolve([{ id: 1 }]));
      svc.getTasks.and.returnValue(Promise.resolve([{ id: 1 }]));
      await request(app)
        .get('/api/v1/checklist/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });

  describe('getCategories', () => {
    it('calls DataService.getCategories', async () => {
      svc.getCategories.and.returnValue(Promise.resolve([{ id: 1 }]));
      svc.getTasks.and.returnValue(Promise.resolve([{ id: 1 }]));
      await request(app)
        .get('/api/v1/categories/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
      expect(svc.getCategories).toHaveBeenCalledWith(1);
    });
  });

  describe('createTask', () => {
    it('calls DataService.createTask', async () => {
      const result = {
        title: 'title',
        text: 'text',
        categoryID: 1,
        isFirstDutyStation: true,
        isFirstTermAirman: true,
        isOfficer: false,
        verificationRequired: true,
        location: 'location',
        office: 'office',
        pocName: 'name',
        pocPhoneNumber: '1234567890',
        pocEmail: 'test@test.com',
      };
      svc.createTask.and.returnValue(
        Promise.resolve({
          title: 'title',
          text: 'text',
          categoryID: 1,
          isFirstDutyStation: true,
          isFirstTermAirman: true,
          isOfficer: false,
          verificationRequired: true,
          location: 'location',
          office: 'office',
          pocName: 'name',
          pocPhoneNumber: '1234567890',
          pocEmail: 'test@test.com',
        })
      );
      svc.saveTask.and.returnValue(
        Promise.resolve({
          title: 'title',
          text: 'text',
          categoryID: 1,
          isFirstDutyStation: true,
          isFirstTermAirman: true,
          isOfficer: false,
          verificationRequired: true,
          location: 'location',
          office: 'office',
          pocName: 'name',
          pocPhoneNumber: '1234567890',
          pocEmail: 'test@test.com',
        })
      );
      await request(app)
        .post('/api/v1/category/1/task')
        .send(result)
        .expect(200)
        .expect(result)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });

  describe('updateTask', () => {
    it('calls DataService.updateTask', async () => {
      const result = {
        title: 'title',
        text: 'text',
        categoryID: 1,
        isFirstDutyStation: true,
        isFirstTermAirman: true,
        isOfficer: false,
        verificationRequired: true,
        location: 'location',
        office: 'office',
        pocName: 'name',
        pocPhoneNumber: '1234567890',
        pocEmail: 'test@test.com',
      };
      svc.updateTask.and.returnValue({
        title: 'title',
        text: 'text',
        categoryID: 1,
        isFirstDutyStation: true,
        isFirstTermAirman: true,
        isOfficer: false,
        verificationRequired: true,
        location: 'location',
        office: 'office',
        pocName: 'name',
        pocPhoneNumber: '1234567890',
        pocEmail: 'test@test.com',
      });
      svc.saveTask.and.returnValue({
        title: 'title',
        text: 'text',
        categoryID: 1,
        isFirstDutyStation: true,
        isFirstTermAirman: true,
        isOfficer: false,
        verificationRequired: true,
        location: 'location',
        office: 'office',
        pocName: 'name',
        pocPhoneNumber: '1234567890',
        pocEmail: 'test@test.com',
      });
      await request(app)
        .put('/api/v1/category/1/task/1')
        .send({
          title: 'title',
          text: 'text',
          categoryID: 1,
          isFirstDutyStation: true,
          isFirstTermAirman: true,
          isOfficer: false,
          verificationRequired: true,
          location: 'location',
          office: 'office',
          pocName: 'name',
          pocPhoneNumber: '1234567890',
          pocEmail: 'test@test.com',
        })
        .expect(200)
        .expect(result)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });

  describe('deleteTask', () => {
    it('calls DataService.deleteTask', async () => {
      svc.deleteTask.and.returnValue(
        Promise.resolve({
          title: 'title',
          text: 'text',
          categoryID: 1,
          isFirstDutyStation: true,
          isFirstTermAirman: true,
          isOfficer: false,
          verificationRequired: true,
          location: 'location',
          office: 'office',
          pocName: 'name',
          pocPhoneNumber: '1234567890',
          pocEmail: 'test@test.com',
        })
      );
      await request(app)
        .delete('/api/v1/category/1/task/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
  });
});
