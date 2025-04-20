import { MigrationInterface, QueryRunner } from "typeorm";

export class SubteamJoin1745009446895 implements MigrationInterface {
    name = 'SubteamJoin1745009446895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_teams\` DROP COLUMN \`JoinLink\``);
        await queryRunner.query(`ALTER TABLE \`sub_teams\` ADD \`JoinLink\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_teams\` DROP COLUMN \`JoinLink\``);
        await queryRunner.query(`ALTER TABLE \`sub_teams\` ADD \`JoinLink\` varchar(255) NULL`);
    }

}
