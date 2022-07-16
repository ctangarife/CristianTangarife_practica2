import { MigrationInterface, QueryRunner } from 'typeorm';

export class metricsNulleable1657987521825 implements MigrationInterface {
  name = 'metricsNulleable1657987521825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "coverage" SET DEFAULT (0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "bugs" SET DEFAULT (0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "vulnerabilities" SET DEFAULT (0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "hotspot" SET DEFAULT (0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "code_smells" SET DEFAULT (0)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "code_smells" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "hotspot" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "vulnerabilities" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "bugs" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "metrics" ALTER COLUMN "coverage" DROP DEFAULT`,
    );
  }
}
