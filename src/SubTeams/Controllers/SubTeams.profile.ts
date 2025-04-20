import { createMap, forMember, mapFrom, MappingProfile, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable, } from '@nestjs/common';
import { SubTeams } from '../Models/SubTeams.entity';
import { SubTeamCardDto } from '../Dtos/SubTeamCard.dto';
import { SubTeamImages } from '../Models/SubTeamImages.entity';
import { SubTeamDto } from '../Dtos/SubTeam.dto';
import { ImagesDto } from 'src/Common/DTOs/Images.dto';
import { SubTeamsMedia } from '../Models/SubTeamsMedia.entity';
import { MediaCreateDto } from 'src/Common/DTOs/MediaCreatedto';
import { SubTeamMembers } from '../Models/SubTeamMembers.entity';
import { MemberReturnDto } from '../Dtos/SubTeamMembersDtos/MemberReturn.dto';

@Injectable()
export class SubTeamsProfile extends AutomapperProfile {

  constructor(
    @InjectMapper()
    mapper: Mapper
  ) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, SubTeams, SubTeamCardDto),
      createMap(mapper, SubTeamImages, ImagesDto, forMember(
        (destination: ImagesDto) => destination.Link,
          mapFrom((source: SubTeamImages) => source.File)
        )
      ),
      createMap(mapper, SubTeams, SubTeamDto,forMember(
        (destination: SubTeamDto) => destination.Leaders,
        mapWith(MemberReturnDto, SubTeamMembers, src => src.Members)
      )
      ),
      createMap(mapper, SubTeamsMedia, MediaCreateDto);
      createMap(mapper, SubTeamMembers, MemberReturnDto);
    };
  }

}

