import Faker from 'faker';
import { User } from '../../entities/User';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.keycloakID = faker.random.uuid();
  user.enabled = true;
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.sessionToken = faker.random.alphaNumeric(20);
  user.isOfficer = faker.random.boolean();
  user.role = 'airman';
  user.isFirstDutyStation = faker.random.boolean();
  user.isFirstTermAirman = faker.random.boolean();
  user.baseID = 1;
  user.unitID = faker.random.number({ max: 5 });

  return user;
});
