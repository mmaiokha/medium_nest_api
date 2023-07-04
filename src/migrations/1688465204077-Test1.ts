import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11688465204077 implements MigrationInterface {
    name = 'Test11688465204077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_entity" ADD "hey" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_entity" DROP COLUMN "hey"`);
    }

}
