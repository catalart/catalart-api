import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateMetadataForArtistsAgain1573442739722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "isBirthDateWithinARange" bit`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3b2ae42146a8d64d6f21d705c2a"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "earliestKnownBirthDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_bfdd940cd80adc1097e5e0f88ae"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "latestKnownBirthDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_7a5f2b62aef18b4b7a57fd50e2d"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "exactBirthDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_591e1e9083294feba843ae61439"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_591e1e9083294feba843ae61439" DEFAULT 0 FOR "exactBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "exactBirthDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_7a5f2b62aef18b4b7a57fd50e2d" DEFAULT 0 FOR "latestKnownBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "latestKnownBirthDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_bfdd940cd80adc1097e5e0f88ae" DEFAULT 0 FOR "earliestKnownBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "earliestKnownBirthDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_3b2ae42146a8d64d6f21d705c2a" DEFAULT 0 FOR "isBirthDateWithinARange"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "isBirthDateWithinARange" bit NOT NULL`);
    }

}
