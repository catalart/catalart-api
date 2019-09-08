import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinTableAttributeToTagsTable1560559518712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tag_artwork_artwork" ("tagId" int NOT NULL, "artworkId" int NOT NULL, CONSTRAINT "PK_78cbdd5f396a0f3d82611abac61" PRIMARY KEY ("tagId", "artworkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5b536db1f701b4dd8f5045fe7" ON "tag_artwork_artwork" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b1d7c0da41e8d445152ae915f8" ON "tag_artwork_artwork" ("artworkId") `);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" ADD CONSTRAINT "FK_b5b536db1f701b4dd8f5045fe72" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" ADD CONSTRAINT "FK_b1d7c0da41e8d445152ae915f81" FOREIGN KEY ("artworkId") REFERENCES "artwork"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" DROP CONSTRAINT "FK_b1d7c0da41e8d445152ae915f81"`);
        await queryRunner.query(`ALTER TABLE "tag_artwork_artwork" DROP CONSTRAINT "FK_b5b536db1f701b4dd8f5045fe72"`);
        await queryRunner.query(`DROP INDEX "IDX_b1d7c0da41e8d445152ae915f8" ON "tag_artwork_artwork"`);
        await queryRunner.query(`DROP INDEX "IDX_b5b536db1f701b4dd8f5045fe7" ON "tag_artwork_artwork"`);
        await queryRunner.query(`DROP TABLE "tag_artwork_artwork"`);
    }

}
