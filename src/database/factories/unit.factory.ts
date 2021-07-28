import Faker from 'faker';
import { Unit } from '../../entities/Unit';
import { define } from 'typeorm-seeding';

define(Unit, (faker: typeof Faker) => {
  const unit = new Unit();

  unit.name = faker.company.companyName();
  unit.baseID = 1;

  return unit;
});
