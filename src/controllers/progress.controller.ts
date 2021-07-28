import { Request, Response } from 'express';
import { DataService } from '../services/data.service';

class ProgressController {
  private _dataService: DataService;
  constructor(dataService: DataService) {
    this._dataService = dataService;
  }

  async getProgress(req: Request, res: Response) {
    console.log(`GET progress`);
    const userID = Number(req.params.userID);
    try {
      const progress = await this._dataService.getProgress(userID);
      console.log('GET progress succeeded:', JSON.stringify(progress, null, 2));
      res.json({ taskStatuses: progress });
    } catch (e) {
      console.error('Unable to GET progress:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  async updateProgress(req: Request, res: Response) {
    console.log(`UPDATE progress`);
    const userID = Number(req.params.userID);
    const status = req.body.status;
    const taskID = req.body.taskID;
    try {
      const result = await this._dataService.updateProgress(
        userID,
        taskID,
        status
      );
      console.log('PUT progress succeeded:', JSON.stringify(result, null, 2));
      const progress = await this._dataService.getProgress(userID);
      res.json({ taskStatuses: progress });
    } catch (e) {
      console.error('Unable to PUT progress:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }
}

export default ProgressController;
