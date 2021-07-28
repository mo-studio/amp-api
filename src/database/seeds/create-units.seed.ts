import { Factory, Seeder } from 'typeorm-seeding';
import { Unit } from '../../entities/Unit';

export default class CreateUnits implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Unit)().createMany(10);
  }
}
