import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateConnectionBetweenArtAndCollectionToManyToMany1569692792877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_b78a615df7ee0f1d4a087f6d819"`);
        await queryRunner.query(`CREATE TABLE "art_collection_artwork_artwork" ("artCollectionId" int NOT NULL, "artworkId" int NOT NULL, CONSTRAINT "PK_20491e1a4bab5840e2a0c64c75a" PRIMARY KEY ("artCollectionId", "artworkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0854e20d31514145489698e96e" ON "art_collection_artwork_artwork" ("artCollectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d87708d40381a6d513952d50c" ON "art_collection_artwork_artwork" ("artworkId") `);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "artCollectionId"`);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" ADD CONSTRAINT "FK_0854e20d31514145489698e96ec" FOREIGN KEY ("artCollectionId") REFERENCES "art_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" ADD CONSTRAINT "FK_1d87708d40381a6d513952d50c3" FOREIGN KEY ("artworkId") REFERENCES "artwork"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" DROP CONSTRAINT "FK_1d87708d40381a6d513952d50c3"`);
        await queryRunner.query(`ALTER TABLE "art_collection_artwork_artwork" DROP CONSTRAINT "FK_0854e20d31514145489698e96ec"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "artCollectionId" int`);
        await queryRunner.query(`DROP INDEX "IDX_1d87708d40381a6d513952d50c" ON "art_collection_artwork_artwork"`);
        await queryRunner.query(`DROP INDEX "IDX_0854e20d31514145489698e96e" ON "art_collection_artwork_artwork"`);
        await queryRunner.query(`DROP TABLE "art_collection_artwork_artwork"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_b78a615df7ee0f1d4a087f6d819" FOREIGN KEY ("artCollectionId") REFERENCES "art_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
