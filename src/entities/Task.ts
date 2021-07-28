import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Joi } from 'express-validation';

export const taskValidation = {
  body: Joi.object({
    title: Joi.string().required().min(1).max(200).replace('%00', ''),
    text: Joi.string().required().min(1).max(1000).replace('%00', ''),
    categoryID: Joi.number().required(),
    isFirstDutyStation: Joi.bool().required(),
    isFirstTermAirman: Joi.bool().required(),
    isOfficer: Joi.bool().required(),
    verificationRequired: Joi.bool().required(),
    location: Joi.string().required().min(1).max(200).replace('%00', ''),
    office: Joi.string().required().min(1).max(200).replace('%00', ''),
    pocName: Joi.string().required().min(1).max(40).replace('%00', ''),
    pocPhoneNumber: Joi.string().required().length(10).replace('%00', ''),
    pocEmail: Joi.string().email().required().replace('%00', ''),
  }),
};

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @Column()
  categoryID!: number;

  @Column()
  isFirstDutyStation!: boolean;

  @Column()
  isFirstTermAirman!: boolean;

  @Column()
  isOfficer!: boolean;

  @Column()
  verificationRequired!: boolean;

  @Column()
  location!: string;

  @Column()
  office!: string;

  @Column()
  pocName!: string;

  @Column()
  pocPhoneNumber!: string;

  @Column()
  pocEmail!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
