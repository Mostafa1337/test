import { MigrationInterface, QueryRunner } from "typeorm";

export class Teams1743593887496 implements MigrationInterface {
    name = 'Teams1743593887496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teams_media\` (\`Name\` varchar(50) NULL, \`Link\` varchar(255) NOT NULL, \`TeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_images\` (\`Name\` varchar(50) NULL, \`File\` varchar(255) NOT NULL, \`TeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teams\` (\`Name\` varchar(15) NOT NULL, \`Desc\` varchar(325) NULL, \`DescShort\` varchar(80) NULL, \`Logo\` varchar(255) NULL, \`Vision\` varchar(325) NULL, \`CommunityId\` varchar(32) NOT NULL, \`LeaderId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_276c49f9292c3ea1e108854284\` (\`CommunityId\`, \`Name\`), UNIQUE INDEX \`IDX_415301d191ba6d526554c7ce9f\` (\`CommunityId\`, \`LeaderId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_leaders\` (\`EndDate\` date NULL, \`StartDate\` date NOT NULL, \`TeamId\` varchar(32) NOT NULL, \`LeaderId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_channels\` (\`Name\` varchar(50) NOT NULL, \`TeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_channel_chats\` (\`Text\` text NOT NULL, \`ChannelId\` varchar(32) NOT NULL, \`UserId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_achievements\` (\`Title\` varchar(50) NOT NULL, \`ImageLink\` varchar(255) NOT NULL, \`Desc\` varchar(325) NULL, \`TeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teams_media\` ADD CONSTRAINT \`FK_8f9a40063cb715e2188c29c90d7\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_images\` ADD CONSTRAINT \`FK_369d452413b8f0e76b4bf31a97b\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_61bf157dc6120627a5e8ecb6429\` FOREIGN KEY (\`LeaderId\`) REFERENCES \`users\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_30351d41593f8db6d1b34265697\` FOREIGN KEY (\`CommunityId\`) REFERENCES \`communities\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_leaders\` ADD CONSTRAINT \`FK_09298534279fcc5dd55cd0046c2\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_leaders\` ADD CONSTRAINT \`FK_05e65baa4716026fa630f3fce6f\` FOREIGN KEY (\`LeaderId\`) REFERENCES \`users\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_channels\` ADD CONSTRAINT \`FK_e5a0292cd834566068d5e8f382b\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_channel_chats\` ADD CONSTRAINT \`FK_87a44ccda9c539ed75b0e50a068\` FOREIGN KEY (\`ChannelId\`) REFERENCES \`team_channels\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_channel_chats\` ADD CONSTRAINT \`FK_d2b110674504aee0011c0e4c4ce\` FOREIGN KEY (\`UserId\`) REFERENCES \`users\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_achievements\` ADD CONSTRAINT \`FK_f302c297fdb895e0da2e2cd0da7\` FOREIGN KEY (\`TeamId\`) REFERENCES \`teams\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`team_achievements\` DROP FOREIGN KEY \`FK_f302c297fdb895e0da2e2cd0da7\``);
        await queryRunner.query(`ALTER TABLE \`team_channel_chats\` DROP FOREIGN KEY \`FK_d2b110674504aee0011c0e4c4ce\``);
        await queryRunner.query(`ALTER TABLE \`team_channel_chats\` DROP FOREIGN KEY \`FK_87a44ccda9c539ed75b0e50a068\``);
        await queryRunner.query(`ALTER TABLE \`team_channels\` DROP FOREIGN KEY \`FK_e5a0292cd834566068d5e8f382b\``);
        await queryRunner.query(`ALTER TABLE \`team_leaders\` DROP FOREIGN KEY \`FK_05e65baa4716026fa630f3fce6f\``);
        await queryRunner.query(`ALTER TABLE \`team_leaders\` DROP FOREIGN KEY \`FK_09298534279fcc5dd55cd0046c2\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_30351d41593f8db6d1b34265697\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_61bf157dc6120627a5e8ecb6429\``);
        await queryRunner.query(`ALTER TABLE \`team_images\` DROP FOREIGN KEY \`FK_369d452413b8f0e76b4bf31a97b\``);
        await queryRunner.query(`ALTER TABLE \`teams_media\` DROP FOREIGN KEY \`FK_8f9a40063cb715e2188c29c90d7\``);
        await queryRunner.query(`DROP TABLE \`team_achievements\``);
        await queryRunner.query(`DROP TABLE \`team_channel_chats\``);
        await queryRunner.query(`DROP TABLE \`team_channels\``);
        await queryRunner.query(`DROP TABLE \`team_leaders\``);
        await queryRunner.query(`DROP INDEX \`IDX_415301d191ba6d526554c7ce9f\` ON \`teams\``);
        await queryRunner.query(`DROP INDEX \`IDX_276c49f9292c3ea1e108854284\` ON \`teams\``);
        await queryRunner.query(`DROP TABLE \`teams\``);
        await queryRunner.query(`DROP TABLE \`team_images\``);
        await queryRunner.query(`DROP TABLE \`teams_media\``);
    }

}
