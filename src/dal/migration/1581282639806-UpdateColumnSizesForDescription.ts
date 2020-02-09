import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumnSizesForDescription1581282639806 implements MigrationInterface {
    name = 'UpdateColumnSizesForDescription1581282639806'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "art_movement" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement" ADD "description" nvarchar(1000) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution" ADD "description" nvarchar(1000) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_genre" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_genre" ADD "description" nvarchar(1000) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_style" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_style" ADD "description" nvarchar(1000) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork_style" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_style" ADD "description" nvarchar(255) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_genre" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork_genre" ADD "description" nvarchar(255) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution" ADD "description" nvarchar(255) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement" DROP COLUMN "description"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement" ADD "description" nvarchar(255) NOT NULL`, undefined);
    }

}
