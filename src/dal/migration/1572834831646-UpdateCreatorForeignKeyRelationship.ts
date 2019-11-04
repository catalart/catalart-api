import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCreatorForeignKeyRelationship1572834831646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf"`);
        await queryRunner.query(`ALTER TABLE "artwork" ALTER COLUMN "creatorId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf" FOREIGN KEY ("creatorId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf"`);
        await queryRunner.query(`ALTER TABLE "artwork" ALTER COLUMN "creatorId" int`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_65b0fdca0139f7eb196e411f3bf" FOREIGN KEY ("creatorId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
