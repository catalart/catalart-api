import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMetadataForArtists1573428775669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "artwork"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_76cd2fdd6e3765699f2427d864e"`);
        await queryRunner.query(`EXEC sp_rename "artwork.classificationTermId", "genreId"`);
        await queryRunner.query(`CREATE TABLE "art_movement" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_caa21f62e10adfb9ab6c11c077e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e55e1f4b7d6bf2e80cb8657e2" ON "art_movement" ("name") `);
        await queryRunner.query(`CREATE TABLE "art_institution" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_6b06f80bf4bffd2af08dd679655" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_344aa277ab7f8344ae0279b3b2" ON "art_institution" ("name") `);
        await queryRunner.query(`CREATE TABLE "genre" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd8cd9e50dd049656e4be1f7e8" ON "genre" ("name") `);
        await queryRunner.query(`CREATE TABLE "art_movement_artists_artist" ("artMovementId" int NOT NULL, "artistId" int NOT NULL, CONSTRAINT "PK_491a55bb4016e90dff7984490aa" PRIMARY KEY ("artMovementId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_64a7bf414cc6c0accdb883fa3a" ON "art_movement_artists_artist" ("artMovementId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06512a2d9db9d1f66176d8428f" ON "art_movement_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "art_institution_artists_artist" ("artInstitutionId" int NOT NULL, "artistId" int NOT NULL, CONSTRAINT "PK_9c9f81decfc04954b07d8adf7f4" PRIMARY KEY ("artInstitutionId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_487666ce5ecfb7cf56221b42ad" ON "art_institution_artists_artist" ("artInstitutionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_75207baecdc2217f035ee72822" ON "art_institution_artists_artist" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isBirthDateKnown" bit NOT NULL CONSTRAINT "DF_a485acad9b1f8012c0afd25d950" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isBirthDateWithinARange" bit NOT NULL CONSTRAINT "DF_3b2ae42146a8d64d6f21d705c2a" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "earliestKnownBirthDateYear" int NOT NULL CONSTRAINT "DF_bfdd940cd80adc1097e5e0f88ae" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "latestKnownBirthDateYear" int NOT NULL CONSTRAINT "DF_7a5f2b62aef18b4b7a57fd50e2d" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "exactBirthDateYear" int NOT NULL CONSTRAINT "DF_591e1e9083294feba843ae61439" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isBirthPlaceKnown" bit NOT NULL CONSTRAINT "DF_ec5374528bcb5b157b7a5d3ee40" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "birthPlaceLocation" nvarchar(255) NOT NULL CONSTRAINT "DF_3201054d81f7174c77aa2ae2d4b" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isDeathDateKnown" bit NOT NULL CONSTRAINT "DF_6a7003d343adaa66219b71cf275" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isDeathDateWithinARange" bit NOT NULL CONSTRAINT "DF_fbaee2053a0a346b9b45ac4ff91" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "earliestKnownDeathDateYear" int NOT NULL CONSTRAINT "DF_3d29c0db3b2cf65a556561d69bd" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "latestKnownDeathDateYear" int NOT NULL CONSTRAINT "DF_be1cf333bac117a6e7d192c0f55" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "exactDeathDateYear" int NOT NULL CONSTRAINT "DF_d0e3cdd2fc4f48c7fbede2be62a" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isDeathPlaceKnown" bit NOT NULL CONSTRAINT "DF_153d2be9b623d9d45a7006c8dfe" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "deathPlaceLocation" nvarchar(255) NOT NULL CONSTRAINT "DF_dfcf6b6feb081850fd28a8bca11" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "nationality" nvarchar(255) NOT NULL CONSTRAINT "DF_c12466490beecc97236be4d7968" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_9e761668f9e276289ae32ab3c30" DEFAULT '' FOR "role"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "DF_f9184212d2c5ce576b233117104" DEFAULT '' FOR "preview"`);
        await queryRunner.query(`CREATE INDEX "IDX_9e761668f9e276289ae32ab3c3" ON "artist" ("role") `);
        await queryRunner.query(`CREATE INDEX "IDX_c12466490beecc97236be4d796" ON "artist" ("nationality") `);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_fe0444a8f4b94650b60d3b36c06" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" ADD CONSTRAINT "FK_64a7bf414cc6c0accdb883fa3ab" FOREIGN KEY ("artMovementId") REFERENCES "art_movement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" ADD CONSTRAINT "FK_06512a2d9db9d1f66176d8428ff" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" ADD CONSTRAINT "FK_487666ce5ecfb7cf56221b42ad2" FOREIGN KEY ("artInstitutionId") REFERENCES "art_institution"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" ADD CONSTRAINT "FK_75207baecdc2217f035ee72822d" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" DROP CONSTRAINT "FK_75207baecdc2217f035ee72822d"`);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" DROP CONSTRAINT "FK_487666ce5ecfb7cf56221b42ad2"`);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" DROP CONSTRAINT "FK_06512a2d9db9d1f66176d8428ff"`);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" DROP CONSTRAINT "FK_64a7bf414cc6c0accdb883fa3ab"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_fe0444a8f4b94650b60d3b36c06"`);
        await queryRunner.query(`DROP INDEX "IDX_c12466490beecc97236be4d796" ON "artist"`);
        await queryRunner.query(`DROP INDEX "IDX_9e761668f9e276289ae32ab3c3" ON "artist"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_f9184212d2c5ce576b233117104"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_9e761668f9e276289ae32ab3c30"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_c12466490beecc97236be4d7968"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_dfcf6b6feb081850fd28a8bca11"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "deathPlaceLocation"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_153d2be9b623d9d45a7006c8dfe"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isDeathPlaceKnown"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_d0e3cdd2fc4f48c7fbede2be62a"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "exactDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_be1cf333bac117a6e7d192c0f55"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "latestKnownDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3d29c0db3b2cf65a556561d69bd"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "earliestKnownDeathDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_fbaee2053a0a346b9b45ac4ff91"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isDeathDateWithinARange"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_6a7003d343adaa66219b71cf275"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isDeathDateKnown"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3201054d81f7174c77aa2ae2d4b"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "birthPlaceLocation"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_ec5374528bcb5b157b7a5d3ee40"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isBirthPlaceKnown"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_591e1e9083294feba843ae61439"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "exactBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_7a5f2b62aef18b4b7a57fd50e2d"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "latestKnownBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_bfdd940cd80adc1097e5e0f88ae"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "earliestKnownBirthDateYear"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_3b2ae42146a8d64d6f21d705c2a"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isBirthDateWithinARange"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "DF_a485acad9b1f8012c0afd25d950"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isBirthDateKnown"`);
        await queryRunner.query(`DROP INDEX "IDX_75207baecdc2217f035ee72822" ON "art_institution_artists_artist"`);
        await queryRunner.query(`DROP INDEX "IDX_487666ce5ecfb7cf56221b42ad" ON "art_institution_artists_artist"`);
        await queryRunner.query(`DROP TABLE "art_institution_artists_artist"`);
        await queryRunner.query(`DROP INDEX "IDX_06512a2d9db9d1f66176d8428f" ON "art_movement_artists_artist"`);
        await queryRunner.query(`DROP INDEX "IDX_64a7bf414cc6c0accdb883fa3a" ON "art_movement_artists_artist"`);
        await queryRunner.query(`DROP TABLE "art_movement_artists_artist"`);
        await queryRunner.query(`DROP INDEX "IDX_dd8cd9e50dd049656e4be1f7e8" ON "genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP INDEX "IDX_344aa277ab7f8344ae0279b3b2" ON "art_institution"`);
        await queryRunner.query(`DROP TABLE "art_institution"`);
        await queryRunner.query(`DROP INDEX "IDX_6e55e1f4b7d6bf2e80cb8657e2" ON "art_movement"`);
        await queryRunner.query(`DROP TABLE "art_movement"`);
        await queryRunner.query(`EXEC sp_rename "artwork.genreId", "classificationTermId"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_76cd2fdd6e3765699f2427d864e" FOREIGN KEY ("classificationTermId") REFERENCES "classification_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
