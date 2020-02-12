import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDbMigration1581474736614 implements MigrationInterface {
    name = 'InitialDbMigration1581474736614'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" int NOT NULL IDENTITY(1,1), "tag" nvarchar(255) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "art_movement" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(1000) NOT NULL, CONSTRAINT "PK_caa21f62e10adfb9ab6c11c077e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6e55e1f4b7d6bf2e80cb8657e2" ON "art_movement" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "art_institution" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(1000) NOT NULL, CONSTRAINT "PK_6b06f80bf4bffd2af08dd679655" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_344aa277ab7f8344ae0279b3b2" ON "art_institution" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "artist" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL CONSTRAINT "DF_9e761668f9e276289ae32ab3c30" DEFAULT '', "preview" nvarchar(255), "isBirthDateKnown" bit NOT NULL CONSTRAINT "DF_a485acad9b1f8012c0afd25d950" DEFAULT 0, "isBirthDateWithinARange" bit, "earliestKnownBirthDateYear" int, "latestKnownBirthDateYear" int, "exactBirthDateYear" int, "isBirthPlaceKnown" bit NOT NULL CONSTRAINT "DF_ec5374528bcb5b157b7a5d3ee40" DEFAULT 0, "birthPlaceLocation" nvarchar(255), "isDeathDateKnown" bit NOT NULL CONSTRAINT "DF_6a7003d343adaa66219b71cf275" DEFAULT 0, "isDeathDateWithinARange" bit, "earliestKnownDeathDateYear" int, "latestKnownDeathDateYear" int, "exactDeathDateYear" int, "isDeathPlaceKnown" bit NOT NULL CONSTRAINT "DF_153d2be9b623d9d45a7006c8dfe" DEFAULT 0, "deathPlaceLocation" nvarchar(255), "nationality" nvarchar(255) NOT NULL CONSTRAINT "DF_c12466490beecc97236be4d7968" DEFAULT '', CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_dd5a88442cd2e068463fa03e49" ON "artist" ("name") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9e761668f9e276289ae32ab3c3" ON "artist" ("role") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c12466490beecc97236be4d796" ON "artist" ("nationality") `, undefined);
        await queryRunner.query(`CREATE TABLE "artwork_genre" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(1000) NOT NULL, CONSTRAINT "PK_f26b24a7d000a1c941641ccf2a3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_59539c655f0d7588c7a8fe21ce" ON "artwork_genre" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "artwork_style" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(1000) NOT NULL, CONSTRAINT "PK_027382828d5f845ce7d29de0a89" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_75997af8acea57c6e35b93f543" ON "artwork_style" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "artwork" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "genreId" int NOT NULL, "styleId" int NOT NULL, "dimensions" nvarchar(255) NOT NULL, "medium" nvarchar(255) NOT NULL, "creatorId" int NOT NULL, "isCreationDateKnown" bit NOT NULL CONSTRAINT "DF_782049d219dc2354ec1e3f5c0a0" DEFAULT 0, "isCreationDateWithinARange" bit, "earliestKnownCreationDateYear" int, "latestKnownCreationDateYear" int, "exactCreationDateYear" int, "isCreationPlaceKnown" bit NOT NULL CONSTRAINT "DF_f73e0daf226a624d243f5d6cc68" DEFAULT 0, "creationPlaceLocation" nvarchar(255), "currentLocation" nvarchar(255) NOT NULL, "preview" nvarchar(255) NOT NULL, "citation" nvarchar(255) NOT NULL, CONSTRAINT "PK_ee2e7c5ad7226179d4113a96fa8" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_fab2d7d88fbfc9994cf8f88d43" ON "artwork" ("title") `, undefined);
        await queryRunner.query(`CREATE TABLE "art_collection" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "type" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "location" nvarchar(255) NOT NULL, CONSTRAINT "PK_2ecf181d1f765a67756c0567e38" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7930ecdecc8fcc20b8aa78169e" ON "art_collection" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "profession" nvarchar(255) NOT NULL, "token" nvarchar(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tag_artwork_artwork" ("tagId" int NOT NULL, "artworkId" int NOT NULL, CONSTRAINT "PK_78cbdd5f396a0f3d82611abac61" PRIMARY KEY ("tagId", "artworkId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b5b536db1f701b4dd8f5045fe7" ON "tag_artwork_artwork" ("tagId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b1d7c0da41e8d445152ae915f8" ON "tag_artwork_artwork" ("artworkId") `, undefined);
        await queryRunner.query(`CREATE TABLE "art_movement_artists_artist" ("artMovementId" int NOT NULL, "artistId" int NOT NULL, CONSTRAINT "PK_491a55bb4016e90dff7984490aa" PRIMARY KEY ("artMovementId", "artistId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_64a7bf414cc6c0accdb883fa3a" ON "art_movement_artists_artist" ("artMovementId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_06512a2d9db9d1f66176d8428f" ON "art_movement_artists_artist" ("artistId") `, undefined);
        await queryRunner.query(`CREATE TABLE "art_institution_artists_artist" ("artInstitutionId" int NOT NULL, "artistId" int NOT NULL, CONSTRAINT "PK_9c9f81decfc04954b07d8adf7f4" PRIMARY KEY ("artInstitutionId", "artistId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_487666ce5ecfb7cf56221b42ad" ON "art_institution_artists_artist" ("artInstitutionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_75207baecdc2217f035ee72822" ON "art_institution_artists_artist" ("artistId") `, undefined);
        await queryRunner.query(`CREATE TABLE "art_collection_artwork_artwork" ("artCollectionId" int NOT NULL, "artworkId" int NOT NULL, CONSTRAINT "PK_20491e1a4bab5840e2a0c64c75a" PRIMARY KEY ("artCollectionId", "artworkId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0854e20d31514145489698e96e" ON "art_collection_artwork_artwork" ("artCollectionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1d87708d40381a6d513952d50c" ON "art_collection_artwork_artwork" ("artworkId") `, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_fe0444a8f4b94650b60d3b36c06" FOREIGN KEY ("genreId") REFERENCES "artwork_genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_a2032dff367e961a59152a141e6" FOREIGN KEY ("styleId") REFERENCES "artwork_style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf" FOREIGN KEY ("creatorId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" ADD CONSTRAINT "FK_b5b536db1f701b4dd8f5045fe72" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" ADD CONSTRAINT "FK_b1d7c0da41e8d445152ae915f81" FOREIGN KEY ("artworkId") REFERENCES "artwork"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" ADD CONSTRAINT "FK_64a7bf414cc6c0accdb883fa3ab" FOREIGN KEY ("artMovementId") REFERENCES "art_movement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" ADD CONSTRAINT "FK_06512a2d9db9d1f66176d8428ff" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" ADD CONSTRAINT "FK_487666ce5ecfb7cf56221b42ad2" FOREIGN KEY ("artInstitutionId") REFERENCES "art_institution"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" ADD CONSTRAINT "FK_75207baecdc2217f035ee72822d" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" ADD CONSTRAINT "FK_0854e20d31514145489698e96ec" FOREIGN KEY ("artCollectionId") REFERENCES "art_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" ADD CONSTRAINT "FK_1d87708d40381a6d513952d50c3" FOREIGN KEY ("artworkId") REFERENCES "artwork"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" DROP CONSTRAINT "FK_1d87708d40381a6d513952d50c3"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" DROP CONSTRAINT "FK_0854e20d31514145489698e96ec"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" DROP CONSTRAINT "FK_75207baecdc2217f035ee72822d"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_institution_artists_artist" DROP CONSTRAINT "FK_487666ce5ecfb7cf56221b42ad2"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" DROP CONSTRAINT "FK_06512a2d9db9d1f66176d8428ff"`, undefined);
        await queryRunner.query(`ALTER TABLE "art_movement_artists_artist" DROP CONSTRAINT "FK_64a7bf414cc6c0accdb883fa3ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" DROP CONSTRAINT "FK_b1d7c0da41e8d445152ae915f81"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" DROP CONSTRAINT "FK_b5b536db1f701b4dd8f5045fe72"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_a2032dff367e961a59152a141e6"`, undefined);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_fe0444a8f4b94650b60d3b36c06"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1d87708d40381a6d513952d50c" ON "art_collection_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0854e20d31514145489698e96e" ON "art_collection_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP TABLE "art_collection_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_75207baecdc2217f035ee72822" ON "art_institution_artists_artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_487666ce5ecfb7cf56221b42ad" ON "art_institution_artists_artist"`, undefined);
        await queryRunner.query(`DROP TABLE "art_institution_artists_artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_06512a2d9db9d1f66176d8428f" ON "art_movement_artists_artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_64a7bf414cc6c0accdb883fa3a" ON "art_movement_artists_artist"`, undefined);
        await queryRunner.query(`DROP TABLE "art_movement_artists_artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b1d7c0da41e8d445152ae915f8" ON "tag_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b5b536db1f701b4dd8f5045fe7" ON "tag_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP TABLE "tag_artwork_artwork"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_7930ecdecc8fcc20b8aa78169e" ON "art_collection"`, undefined);
        await queryRunner.query(`DROP TABLE "art_collection"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_fab2d7d88fbfc9994cf8f88d43" ON "artwork"`, undefined);
        await queryRunner.query(`DROP TABLE "artwork"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_75997af8acea57c6e35b93f543" ON "artwork_style"`, undefined);
        await queryRunner.query(`DROP TABLE "artwork_style"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_59539c655f0d7588c7a8fe21ce" ON "artwork_genre"`, undefined);
        await queryRunner.query(`DROP TABLE "artwork_genre"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c12466490beecc97236be4d796" ON "artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9e761668f9e276289ae32ab3c3" ON "artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_dd5a88442cd2e068463fa03e49" ON "artist"`, undefined);
        await queryRunner.query(`DROP TABLE "artist"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_344aa277ab7f8344ae0279b3b2" ON "art_institution"`, undefined);
        await queryRunner.query(`DROP TABLE "art_institution"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6e55e1f4b7d6bf2e80cb8657e2" ON "art_movement"`, undefined);
        await queryRunner.query(`DROP TABLE "art_movement"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
    }

}
