import { MigrationInterface, QueryRunner } from "typeorm";

export class Communities1742303620793 implements MigrationInterface {
    name = 'Communities1742303620793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`communities_media\` (\`Name\` varchar(50) NULL, \`Link\` varchar(255) NOT NULL, \`CommunityId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`communities_images\` (\`Name\` varchar(50) NULL, \`File\` varchar(255) NOT NULL, \`CommunityId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`communities\` (\`Name\` varchar(15) NOT NULL, \`Desc\` varchar(325) NULL, \`DescShort\` varchar(80) NULL, \`Logo\` varchar(255) NULL, \`Vision\` varchar(325) NULL, \`LeaderId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7354ce1ecdeb35407ec62855fe\` (\`Name\`), UNIQUE INDEX \`IDX_05e286a425e01f024d6a3c0a23\` (\`LeaderId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`communities_media\` ADD CONSTRAINT \`FK_ca6f54068acdb71894018780c38\` FOREIGN KEY (\`CommunityId\`) REFERENCES \`communities\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`communities_images\` ADD CONSTRAINT \`FK_331c9fa4fbb8af7e42747e3146c\` FOREIGN KEY (\`CommunityId\`) REFERENCES \`communities\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`communities\` ADD CONSTRAINT \`FK_05e286a425e01f024d6a3c0a237\` FOREIGN KEY (\`LeaderId\`) REFERENCES \`users\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`communities\` DROP FOREIGN KEY \`FK_05e286a425e01f024d6a3c0a237\``);
        await queryRunner.query(`ALTER TABLE \`communities_images\` DROP FOREIGN KEY \`FK_331c9fa4fbb8af7e42747e3146c\``);
        await queryRunner.query(`ALTER TABLE \`communities_media\` DROP FOREIGN KEY \`FK_ca6f54068acdb71894018780c38\``);
        await queryRunner.query(`DROP INDEX \`IDX_05e286a425e01f024d6a3c0a23\` ON \`communities\``);
        await queryRunner.query(`DROP INDEX \`IDX_7354ce1ecdeb35407ec62855fe\` ON \`communities\``);
        await queryRunner.query(`DROP TABLE \`communities\``);
        await queryRunner.query(`DROP TABLE \`communities_images\``);
        await queryRunner.query(`DROP TABLE \`communities_media\``);
    }

}
