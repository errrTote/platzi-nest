import { MigrationInterface, QueryRunner } from "typeorm";

export class addTimestampFields1650516251940 implements MigrationInterface {
  name = "addTimestampFields1650516251940";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "lastName" TO "last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "last_name" TO "lastName"`,
    );
  }
}
