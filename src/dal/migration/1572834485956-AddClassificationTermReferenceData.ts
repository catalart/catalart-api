import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClassificationTermReferenceData1572834485956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`EXEC sp_rename "artwork.classificationTerm", "classificationTermId"`);
        await queryRunner.query(`CREATE TABLE "classification_term" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "label" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_67e6d73b16b1f5ae7811db87441" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_830ceb30f6306465aa9c0d39fc" ON "classification_term" ("name") `);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "classificationTermId"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "classificationTermId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_76cd2fdd6e3765699f2427d864e" FOREIGN KEY ("classificationTermId") REFERENCES "classification_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_76cd2fdd6e3765699f2427d864e"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "classificationTermId"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "classificationTermId" nvarchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_830ceb30f6306465aa9c0d39fc" ON "classification_term"`);
        await queryRunner.query(`DROP TABLE "classification_term"`);
        await queryRunner.query(`EXEC sp_rename "artwork.classificationTermId", "classificationTerm"`);
    }

}
