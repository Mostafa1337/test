import { createMap, forMember, mapFrom, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable, } from '@nestjs/common';
import { Teams } from '../Models/Teams.entity';
import { TeamCardDto } from '../Dtos/TeamCard.dto';
import { TeamImages } from '../Models/TeamImages.entity';
import { TeamDto } from '../Dtos/Team.dto';
import { ImagesDto } from 'src/Common/DTOs/Images.dto';
import { TeamsMedia } from '../Models/TeamsMedia.entity';
import { MediaCreateDto } from 'src/Common/DTOs/MediaCreatedto';
import { TeamLeaders } from '../Models/TeamLeaders.entity';
import { TeamLeaderDto } from '../Dtos/TeamLeader';
import { TeamAchievements } from '../Models/TeamAchievements.entity';
import { TeamAchievmentDto } from '../Dtos/TeamAchievment';

@Injectable()
export class TeamsProfile extends AutomapperProfile {

  constructor(
    @InjectMapper()
    mapper: Mapper
  ) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Teams, TeamCardDto),
          createMap(mapper, TeamImages, ImagesDto, forMember(
            (destination: ImagesDto) => destination.Link,
            mapFrom((source: TeamImages) => source.File)
          )
        ),
        createMap(mapper, TeamLeaders, TeamLeaderDto, 
          forMember(
            (destination: TeamLeaderDto) => destination.FirstName,
            mapFrom((source: TeamLeaders) => source.Leader?.FirstName)
          ),
          forMember(
            (destination: TeamLeaderDto) => destination.ProfilePhoto,
            mapFrom((source: TeamLeaders) => source.Leader?.ProfilePhoto)
          )
        ),
        createMap(mapper, Teams, TeamDto),
        createMap(mapper, TeamsMedia, MediaCreateDto),
        createMap(mapper, TeamAchievements, TeamAchievmentDto)
    };
  }

}

