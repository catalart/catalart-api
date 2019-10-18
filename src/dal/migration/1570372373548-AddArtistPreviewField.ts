import {MigrationInterface, QueryRunner} from "typeorm";

export class AddArtistPreviewField1570372373548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "preview" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "preview"`);
    }

}
