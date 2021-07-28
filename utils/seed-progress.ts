import { createConnection, getManager } from 'typeorm';
import { User } from '../src/entities/User';
import { Progress, Status } from '../src/entities/Progress';
import { PostgresDataService } from '../src/services/data.service';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const seedProgress = async () => {
  const dataService = new PostgresDataService();

  const connection = await createConnection();
  const users = await getManager(connection.name).getRepository(User).find();
  users.forEach(async (user) => {
    try {
      const baseCategory = await dataService.getCategories(user.baseID);
      const unitCategories = await dataService.getCategories(user.unitID);
      const allCategories = baseCategory.concat(unitCategories);

      const statuses = [
        Status.INPROGRESS,
        Status.COMPLETED,
        Status.PENDINGVERIFICATION,
      ];

      await Promise.all(
        allCategories.map(async (category) => {
          let tasks = await dataService.getTasks(category.id);
          tasks.forEach(async (task) => {
            if (getRandomInt(2) == 1) {
              return;
            }
            let progress = new Progress();
            progress.taskID = task.id;
            progress.userID = user.id;
            progress.status = statuses[getRandomInt(statuses.length)];
            if (
              progress.status == Status.PENDINGVERIFICATION &&
              !task.verificationRequired
            ) {
              progress.status = Status.COMPLETED;
            }
            await getManager().getRepository(Progress).save(progress);
          });
        })
      );
    } catch (e) {
      console.log(e);
    }
  });
};

export default seedProgress();
