import { Factory, Seeder } from 'typeorm-seeding';
import { Base } from '../../entities/Base';

export default class CreateBases implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Base)().create();
  }
}
