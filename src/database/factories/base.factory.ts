import Faker from 'faker';
import { Base } from '../../entities/Base';
import { define } from 'typeorm-seeding';

define(Base, (faker: typeof Faker) => {
  const base = new Base();

  base.name = faker.company.companyName();
  base.city = faker.address.city();
  base.state = faker.address.state();

  return base;
});
