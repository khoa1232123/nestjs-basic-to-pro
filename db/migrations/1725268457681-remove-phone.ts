import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhone1725268457681 implements MigrationInterface {
    name = 'RemovePhone1725268457681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
