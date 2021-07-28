import { Request, Response } from 'express';
import { DataService } from '../services/data.service';

class UnitController {
  private _dataService: DataService;
  constructor(dataService: DataService) {
    this._dataService = dataService;
  }

  async getUnits(req: Request, res: Response) {
    console.log(`GET units`);
    const baseID = Number(req.params.baseID);
    try {
      const result = await this._dataService.getUnits(baseID);
      console.log('GET units succeeded:', JSON.stringify(result, null, 2));
      res.json(result);
    } catch (e) {
      console.error('Unable to GET units:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  // async getBases(req: Request, res: Response) {
  //   try {
  //     const result = await this._dataService.getBases();
  //     console.log('Get bases succeeded:', JSON.stringify(result, null, 2));
  //     res.json(result);
  //   } catch (e) {
  //     console.error('Unable to get bases:', JSON.stringify(e, null, 2));
  //     res.sendStatus(500).send(e);
  //   }
  // }

  async getAirmen(req: Request, res: Response) {
    console.log(`GET airmen in unit`);
    try {
      const baseID = Number(req.params.baseID);
      const unitID = Number(req.params.unitID);
      const result = await this._dataService.getAirmen(baseID, unitID);
      console.log(
        'GET airmen in unit succeeded:',
        JSON.stringify(result, null, 2)
      );
      res.json(result);
    } catch (e) {
      console.error(
        'Unable to GET airmen in unit:',
        JSON.stringify(e, null, 2)
      );
      res.sendStatus(500).send(e);
    }
  }
}

export default UnitController;
