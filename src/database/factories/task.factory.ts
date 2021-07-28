import Faker from 'faker';
import { Task } from '../../entities/Task';
import { define } from 'typeorm-seeding';

define(Task, (faker: typeof Faker) => {
  const task = new Task();

  task.title = faker.lorem.words(5);
  task.text = faker.lorem.words(50);
  task.categoryID = faker.random.number(10);
  task.isFirstDutyStation = faker.random.boolean();
  task.isFirstTermAirman = faker.random.boolean();
  task.isOfficer = faker.random.boolean();
  task.verificationRequired = faker.random.boolean();
  task.location = faker.address.streetAddress();
  task.office = faker.name.jobArea();
  task.pocName = faker.name.firstName() + ' ' + faker.name.lastName();
  task.pocPhoneNumber = faker.phone.phoneNumber();
  task.pocEmail = faker.internet.email();

  return task;
});
