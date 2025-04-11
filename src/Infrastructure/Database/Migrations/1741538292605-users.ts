import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1741538292605 implements MigrationInterface {
    name = 'Users1741538292605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`usertype\` enum ('0', '1') NOT NULL DEFAULT '0', \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`email\` varchar(62) NOT NULL, \`IsSuperAdmin\` tinyint NOT NULL DEFAULT 0, \`VerifyDate\` datetime NULL, \`phonenumber\` varchar(15) NOT NULL, \`studentid\` varchar(50) NULL, \`password\` varchar(255) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_ecd08249a32b08dabf8242623d\` (\`studentid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ecd08249a32b08dabf8242623d\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
