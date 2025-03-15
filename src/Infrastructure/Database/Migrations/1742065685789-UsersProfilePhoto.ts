import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersProfilePhoto1742065685789 implements MigrationInterface {
    name = 'UsersProfilePhoto1742065685789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`Profilephoto\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`Profilephoto\``);
    }

}
