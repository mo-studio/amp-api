import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Unit } from './Unit';
import { Base } from './Base';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  keycloakID!: string;

  @Column()
  enabled!: boolean;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  role!: string;

  @Column()
  sessionToken?: string;

  @Column()
  unitID!: number;

  @Column()
  baseID!: number;

  @Column()
  isFirstTermAirman!: boolean;

  @Column()
  isOfficer!: boolean;

  @Column()
  isFirstDutyStation!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
