import Faker from 'faker';
import { Category } from '../../entities/Category';
import { define, factory } from 'typeorm-seeding';

define(Category, (faker: typeof Faker) => {
  const category = new Category();

  category.title = faker.company.companyName();
  category.ownerID = faker.random.number(10);

  return category;
});
