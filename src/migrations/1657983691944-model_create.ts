import { MigrationInterface, QueryRunner } from 'typeorm';

export class modelCreate1657983691944 implements MigrationInterface {
  name = 'modelCreate1657983691944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "organization_id_seq"`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "organization" ("created_at" timestamp NOT NULL DEFAULT current_timestamp(), "updated_at" timestamp NOT NULL DEFAULT current_timestamp(), "id" INT DEFAULT nextval('"organization_id_seq"') NOT NULL, "name" varchar(50) NOT NULL, "status" int8 NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tribe_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "tribe" ("created_at" timestamp NOT NULL DEFAULT current_timestamp(), "updated_at" timestamp NOT NULL DEFAULT current_timestamp(), "id" INT DEFAULT nextval('"tribe_id_seq"') NOT NULL, "name" varchar(50) NOT NULL, "status" int8 NOT NULL, "id_organization" int8, CONSTRAINT "PK_43066292406f7b89ee83eb70c69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_dcdd03e44f28bdf784d4331482" ON "tribe" ("id_organization") `,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "repository_id_seq"`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "repository" ("created_at" timestamp NOT NULL DEFAULT current_timestamp(), "updated_at" timestamp NOT NULL DEFAULT current_timestamp(), "id" INT DEFAULT nextval('"repository_id_seq"') NOT NULL, "name" varchar(50) NOT NULL, "state" varchar(1) NOT NULL DEFAULT 'E', "status" varchar(1) NOT NULL DEFAULT 'A', "id_tribe" int8, "metricId" int8, CONSTRAINT "REL_9b054508d0a508525d9918b397" UNIQUE ("metricId"), CONSTRAINT "PK_b842c26651c6fc0b9ccd1c530e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_3572e75b71052040481c022dfd" ON "repository" ("id_tribe") `,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_9b054508d0a508525d9918b397" ON "repository" ("metricId") `,
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "metrics_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "metrics" ("created_at" timestamp NOT NULL DEFAULT current_timestamp(), "updated_at" timestamp NOT NULL DEFAULT current_timestamp(), "id" INT DEFAULT nextval('"metrics_id_seq"') NOT NULL, "coverage" float8 NOT NULL, "bugs" int8 NOT NULL, "vulnerabilities" int8 NOT NULL, "hotspot" int8 NOT NULL, "code_smells" int8 NOT NULL, "id_repository" int8, CONSTRAINT "REL_c3d911b1d911a990e617041947" UNIQUE ("id_repository"), CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_c3d911b1d911a990e617041947" ON "metrics" ("id_repository") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tribe" ADD CONSTRAINT "FK_dcdd03e44f28bdf784d43314825" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository" ADD CONSTRAINT "FK_3572e75b71052040481c022dfdd" FOREIGN KEY ("id_tribe") REFERENCES "tribe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository" ADD CONSTRAINT "FK_9b054508d0a508525d9918b3974" FOREIGN KEY ("metricId") REFERENCES "metrics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ADD CONSTRAINT "FK_c3d911b1d911a990e617041947b" FOREIGN KEY ("id_repository") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metrics" DROP CONSTRAINT "FK_c3d911b1d911a990e617041947b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository" DROP CONSTRAINT "FK_9b054508d0a508525d9918b3974"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository" DROP CONSTRAINT "FK_3572e75b71052040481c022dfdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tribe" DROP CONSTRAINT "FK_dcdd03e44f28bdf784d43314825"`,
    );
    await queryRunner.query(
      `DROP INDEX "metrics"@"IDX_c3d911b1d911a990e617041947" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "metrics"`);
    await queryRunner.query(`DROP SEQUENCE "metrics_id_seq"`);
    await queryRunner.query(
      `DROP INDEX "repository"@"IDX_9b054508d0a508525d9918b397" CASCADE`,
    );
    await queryRunner.query(
      `DROP INDEX "repository"@"IDX_3572e75b71052040481c022dfd" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "repository"`);
    await queryRunner.query(`DROP SEQUENCE "repository_id_seq"`);
    await queryRunner.query(
      `DROP INDEX "tribe"@"IDX_dcdd03e44f28bdf784d4331482" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "tribe"`);
    await queryRunner.query(`DROP SEQUENCE "tribe_id_seq"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP SEQUENCE "organization_id_seq"`);
  }
}
