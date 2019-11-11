import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateMetadataForArtists1573442576290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "preview" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_f9184212d2c5ce576b233117104"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "birthPlaceLocation" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3201054d81f7174c77aa2ae2d4b"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "isDeathDateWithinARange" bit`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_fbaee2053a0a346b9b45ac4ff91"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "earliestKnownDeathDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3d29c0db3b2cf65a556561d69bd"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "latestKnownDeathDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_be1cf333bac117a6e7d192c0f55"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "exactDeathDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_d0e3cdd2fc4f48c7fbede2be62a"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "deathPlaceLocation" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_dfcf6b6feb081850fd28a8bca11"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_dfcf6b6feb081850fd28a8bca11" DEFAULT '' FOR "deathPlaceLocation"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "deathPlaceLocation" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_d0e3cdd2fc4f48c7fbede2be62a" DEFAULT 0 FOR "exactDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "exactDeathDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_be1cf333bac117a6e7d192c0f55" DEFAULT 0 FOR "latestKnownDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "latestKnownDeathDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_3d29c0db3b2cf65a556561d69bd" DEFAULT 0 FOR "earliestKnownDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "earliestKnownDeathDateYear" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_fbaee2053a0a346b9b45ac4ff91" DEFAULT 0 FOR "isDeathDateWithinARange"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "isDeathDateWithinARange" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_3201054d81f7174c77aa2ae2d4b" DEFAULT '' FOR "birthPlaceLocation"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "birthPlaceLocation" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_f9184212d2c5ce576b233117104" DEFAULT '' FOR "preview"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "preview" nvarchar(255) NOT NULL`);
    }

}
