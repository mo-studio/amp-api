import { Factory, Seeder } from 'typeorm-seeding';
import { Category } from '../../entities/Category';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Category)().createMany(10);
  }
}
