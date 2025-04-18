import { MigrationInterface, QueryRunner } from "typeorm";

export class Subeam1744913745641 implements MigrationInterface {
    name = 'Subeam1744913745641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sub_teams_media\` (\`Name\` varchar(50) NULL, \`Link\` varchar(255) NOT NULL, \`SubTeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_teams\` (\`Name\` varchar(15) NOT NULL, \`Desc\` varchar(325) NULL, \`DescShort\` varchar(80) NULL, \`Logo\` varchar(255) NULL, \`Vision\` varchar(325) NULL, \`CommunityId\` varchar(32) NOT NULL, \`TeamId\` varchar(32) NOT NULL, \`JoinLink\` varchar(255) NULL, \`LearningPhaseTitle\` varchar(15) NOT NULL, \`LearningPhaseDesc\` varchar(325) NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_team_members\` (\`IsHead\` tinyint NOT NULL DEFAULT 0, \`UserId\` varchar(32) NOT NULL, \`SubTeamId\` varchar(32) NOT NULL, \`JoinDate\` datetime NULL, \`LeaveDate\` datetime NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4e73b4710cca697cb8bd779947\` (\`SubTeamId\`, \`UserId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_team_images\` (\`Name\` varchar(50) NULL, \`File\` varchar(255) NOT NULL, \`SubTeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_team_channels\` (\`Name\` varchar(50) NOT NULL, \`SubTeamId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_team_channel_chats\` (\`Text\` text NOT NULL, \`ChannelId\` varchar(32) NOT NULL, \`UserId\` varchar(32) NOT NULL, \`Id\` varchar(32) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sub_teams_media\` ADD CONSTRAINT \`FK_0eb59d3573c9507fa84c377df3a\` FOREIGN KEY (\`SubTeamId\`) REFERENCES \`sub_teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_teams\` ADD CONSTRAINT \`FK_87f4e50ddcadfc93b3aed9e5919\` FOREIGN KEY (\`CommunityId\`) REFERENCES \`communities\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_members\` ADD CONSTRAINT \`FK_c8251e8dcb630fa24b58413499c\` FOREIGN KEY (\`SubTeamId\`) REFERENCES \`sub_teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_members\` ADD CONSTRAINT \`FK_3b53da2e6d9bd74ab5e4039f29e\` FOREIGN KEY (\`UserId\`) REFERENCES \`users\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_images\` ADD CONSTRAINT \`FK_f8c90d617b595ae581d9de0e123\` FOREIGN KEY (\`SubTeamId\`) REFERENCES \`sub_teams\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_channels\` ADD CONSTRAINT \`FK_eac8d2b0c565448859dc8c9c07b\` FOREIGN KEY (\`SubTeamId\`) REFERENCES \`sub_teams\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_channel_chats\` ADD CONSTRAINT \`FK_b4668fb97d7982f86b1c8cd7203\` FOREIGN KEY (\`ChannelId\`) REFERENCES \`sub_team_channels\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_team_channel_chats\` ADD CONSTRAINT \`FK_fd115258835046d9b581b7d35b7\` FOREIGN KEY (\`UserId\`) REFERENCES \`users\`(\`Id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_team_channel_chats\` DROP FOREIGN KEY \`FK_fd115258835046d9b581b7d35b7\``);
        await queryRunner.query(`ALTER TABLE \`sub_team_channel_chats\` DROP FOREIGN KEY \`FK_b4668fb97d7982f86b1c8cd7203\``);
        await queryRunner.query(`ALTER TABLE \`sub_team_channels\` DROP FOREIGN KEY \`FK_eac8d2b0c565448859dc8c9c07b\``);
        await queryRunner.query(`ALTER TABLE \`sub_team_images\` DROP FOREIGN KEY \`FK_f8c90d617b595ae581d9de0e123\``);
        await queryRunner.query(`ALTER TABLE \`sub_team_members\` DROP FOREIGN KEY \`FK_3b53da2e6d9bd74ab5e4039f29e\``);
        await queryRunner.query(`ALTER TABLE \`sub_team_members\` DROP FOREIGN KEY \`FK_c8251e8dcb630fa24b58413499c\``);
        await queryRunner.query(`ALTER TABLE \`sub_teams\` DROP FOREIGN KEY \`FK_87f4e50ddcadfc93b3aed9e5919\``);
        await queryRunner.query(`ALTER TABLE \`sub_teams_media\` DROP FOREIGN KEY \`FK_0eb59d3573c9507fa84c377df3a\``);
        await queryRunner.query(`DROP TABLE \`sub_team_channel_chats\``);
        await queryRunner.query(`DROP TABLE \`sub_team_channels\``);
        await queryRunner.query(`DROP TABLE \`sub_team_images\``);
        await queryRunner.query(`DROP INDEX \`IDX_4e73b4710cca697cb8bd779947\` ON \`sub_team_members\``);
        await queryRunner.query(`DROP TABLE \`sub_team_members\``);
        await queryRunner.query(`DROP TABLE \`sub_teams\``);
        await queryRunner.query(`DROP TABLE \`sub_teams_media\``);
    }

}
