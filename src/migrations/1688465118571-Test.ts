import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1688465118571 implements MigrationInterface {
    name = 'Test1688465118571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_entity" ("id" SERIAL NOT NULL, "test" character varying NOT NULL, CONSTRAINT "PK_cc0413536e3afc0e586996bea40" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_entity"`);
    }

}
