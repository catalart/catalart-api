import {MigrationInterface, QueryRunner} from "typeorm";

export class AddArtworkAndArtCollections1560470424686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "art_collection" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "type" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "location" nvarchar(255) NOT NULL, "containsArtCollections" bit NOT NULL, CONSTRAINT "PK_2ecf181d1f765a67756c0567e38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" int NOT NULL IDENTITY(1,1), "tag" nvarchar(255) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "material"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "title" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "classificationTerm" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "dimensions" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "materialsAndTechniquesDescription" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "creationDate" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "currentLocation" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "preview" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "citation" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "creatorId" int`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf" FOREIGN KEY ("creatorId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "citation"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "preview"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "currentLocation"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "materialsAndTechniquesDescription"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "dimensions"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "classificationTerm"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "material" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "name" nvarchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "art_collection"`);
    }

}
