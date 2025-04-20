import { MigrationInterface, QueryRunner } from "typeorm";

export class SubteamJoin1745010148571 implements MigrationInterface {
    name = 'SubteamJoin1745010148571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_teams\` ADD CONSTRAINT \`FK_b40d80527b0161b00f625bb5df2\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_teams\` DROP FOREIGN KEY \`FK_b40d80527b0161b00f625bb5df2\``);
    }

}
