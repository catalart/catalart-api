import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameMediumColumn1573608297227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`EXEC sp_rename "artwork.materialsAndTechniquesDescription", "medium"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`EXEC sp_rename "artwork.medium", "materialsAndTechniquesDescription"`);
    }

}
