import { DeleteResult, getManager } from 'typeorm';
import { User } from '../entities/User';
import { Progress, Status } from '../entities/Progress';
import { Category } from '../entities/Category';
import { Unit } from '../entities/Unit';
import { Task } from '../entities/Task';

export interface DataService {
  createUser(user: User): Promise<User>;
  getUser(userID: number): Promise<User | undefined>;

  getCategories(ownerID: number): Promise<Category[]>;
  getTasks(categoryID: number): Promise<Task[]>;
  getUsers(): Promise<User[]>;
  saveTask(task: Task): Promise<Task>;
  deleteTask(taskID: number): Promise<DeleteResult>;

  getProgress(userID: number): Promise<Progress[]>;
  updateProgress(
    userID: number,
    taskID: number,
    status: Status
  ): Promise<Progress>;

  getUnits(baseID: number): Promise<Unit[]>;
  getAirmen(baseID: number, unitID: number): Promise<User[]>;
}

export class PostgresDataService implements DataService {
  createUser(user: User): Promise<User> {
    return getManager().getRepository(User).save(user);
  }

  getUser(userID: number): Promise<User | undefined> {
    return getManager().getRepository(User).findOne(userID);
  }

  getCategories(ownerID: number): Promise<Category[]> {
    return getManager().getRepository(Category).find({ ownerID: ownerID });
  }

  getTasks(categoryID: number): Promise<Task[]> {
    return getManager().getRepository(Task).find({ categoryID: categoryID });
  }

  getUsers(): Promise<User[]> {
    return getManager()
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }

  saveTask(task: Task): Promise<Task> {
    return getManager().getRepository(Task).save(task);
  }

  deleteTask(taskID: number): Promise<DeleteResult> {
    return getManager().getRepository(Task).delete(taskID);
  }

  getProgress(userID: number): Promise<Progress[]> {
    return getManager().getRepository(Progress).find({ userID: userID });
  }

  async updateProgress(
    userID: number,
    taskID: number,
    status: Status
  ): Promise<any> {
    let repository = getManager().getRepository(Progress);
    let progressToUpdate = await repository.findOne({
      userID: userID,
      taskID: taskID,
    });
    if (progressToUpdate == null) {
      let newProgress = new Progress();
      newProgress.userID = userID;
      newProgress.taskID = taskID;
      newProgress.status = status;
      return repository.save(newProgress);
    } else {
      progressToUpdate.status = status;
      return repository.save(progressToUpdate);
    }
  }

  getUnits(baseID: number): Promise<Unit[]> {
    return getManager().getRepository(Unit).find({ baseID: baseID });
  }

  getAirmen(baseID: number, unitID: number): Promise<User[]> {
    return getManager()
      .getRepository(User)
      .find({ baseID: baseID, unitID: unitID });
  }
}
