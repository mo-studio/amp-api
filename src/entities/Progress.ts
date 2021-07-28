import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  NOTSTARTED = 'notStarted',
  INPROGRESS = 'inProgress',
  PENDINGVERIFICATION = 'pendingVerification',
  COMPLETED = 'completed',
}

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NOTSTARTED,
  })
  status!: Status;

  @Column()
  taskID!: number;

  @Column()
  userID!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
