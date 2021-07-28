import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialEntityCreation1615230914157 implements MigrationInterface {
  name = 'initialEntityCreation1615230914157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "ownerID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "baseID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "base" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "categoryID" integer NOT NULL, "isFirstDutyStation" boolean NOT NULL, "isFirstTermAirman" boolean NOT NULL, "isOfficer" boolean NOT NULL, "verificationRequired" boolean NOT NULL, "location" character varying NOT NULL, "office" character varying NOT NULL, "pocName" character varying NOT NULL, "pocPhoneNumber" character varying NOT NULL, "pocEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "keycloakID" character varying NOT NULL, "enabled" boolean NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "role" character varying NOT NULL, "sessionToken" character varying NOT NULL, "unitID" integer NOT NULL, "baseID" integer NOT NULL, "isFirstTermAirman" boolean NOT NULL, "isOfficer" boolean NOT NULL, "isFirstDutyStation" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "progress_status_enum" AS ENUM('notStarted', 'inProgress', 'pendingVerification', 'completed')`
    );
    await queryRunner.query(
      `CREATE TABLE "progress" ("id" SERIAL NOT NULL, "status" "progress_status_enum" NOT NULL DEFAULT 'notStarted', "taskID" integer NOT NULL, "userID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "progress"`);
    await queryRunner.query(`DROP TYPE "progress_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "base"`);
    await queryRunner.query(`DROP TABLE "unit"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
