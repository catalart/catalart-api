import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConnectionBetweenArtCollectionsAndArtwork1564449184704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "art_collection" DROP COLUMN "containsArtCollections"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "artCollectionId" int`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_b78a615df7ee0f1d4a087f6d819" FOREIGN KEY ("artCollectionId") REFERENCES "art_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_b78a615df7ee0f1d4a087f6d819"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "artCollectionId"`);
        await queryRunner.query(`ALTER TABLE "art_collection" ADD "containsArtCollections" bit NOT NULL`);
    }

}
