import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBasicInformationOnUsersAndArtwork1559176607166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "artwork" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "material" nvarchar(255) NOT NULL, CONSTRAINT "PK_ee2e7c5ad7226179d4113a96fa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "profession" nvarchar(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "artwork"`);
    }

}
