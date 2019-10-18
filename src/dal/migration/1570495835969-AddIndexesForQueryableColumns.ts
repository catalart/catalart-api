import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIndexesForQueryableColumns1570495835969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_dd5a88442cd2e068463fa03e49" ON "artist" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_fab2d7d88fbfc9994cf8f88d43" ON "artwork" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_7930ecdecc8fcc20b8aa78169e" ON "art_collection" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_7930ecdecc8fcc20b8aa78169e" ON "art_collection"`);
        await queryRunner.query(`DROP INDEX "IDX_fab2d7d88fbfc9994cf8f88d43" ON "artwork"`);
        await queryRunner.query(`DROP INDEX "IDX_dd5a88442cd2e068463fa03e49" ON "artist"`);
    }

}
