import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateMetadataForArtwork1573527029373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "styleId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "isCreationDateKnown" bit NOT NULL CONSTRAINT "DF_782049d219dc2354ec1e3f5c0a0" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "isCreationDateWithinARange" bit`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "earliestKnownCreationDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "latestKnownCreationDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "exactCreationDateYear" int`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "isCreationPlaceKnown" bit NOT NULL CONSTRAINT "DF_f73e0daf226a624d243f5d6cc68" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "creationPlaceLocation" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_a2032dff367e961a59152a141e6" FOREIGN KEY ("styleId") REFERENCES "artwork_style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_a2032dff367e961a59152a141e6"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "creationPlaceLocation"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "DF_f73e0daf226a624d243f5d6cc68"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "isCreationPlaceKnown"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "exactCreationDateYear"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "latestKnownCreationDateYear"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "earliestKnownCreationDateYear"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "isCreationDateWithinARange"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "DF_782049d219dc2354ec1e3f5c0a0"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "isCreationDateKnown"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "styleId"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD "creationDate" nvarchar(255) NOT NULL`);
    }

}
