import { Factory, Seeder } from 'typeorm-seeding';
import { Task } from '../../entities/Task';

export default class CreateTasks implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Task)().createMany(30);
  }
}
