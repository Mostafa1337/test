import { createMap, forMember, mapFrom, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable, } from '@nestjs/common';
import { LogoDto } from '../Dtos/Logo.dto';
import { Communities } from '../Models/Communities.entity';
import { CommunityCardDto } from '../Dtos/CommunityCard.dto';
import { CommunitiesImagesDto } from '../Dtos/CommunitiesImages.dto';
import { CommunitiesImages } from '../Models/CommunitiesImages.entity';
import { CommunityDto } from '../Dtos/Community.dto';
import { CommunityMediaCreateDto } from '../Dtos/CommunityMediaCreatedto';
import { CommunitiesMedia } from '../Models/CommunitiesMedia.entity';
import { CommunityUpdateDto } from '../Dtos/CommunityUpdate.dto';

@Injectable()
export class CommunitiesProfile extends AutomapperProfile {

  constructor(
    @InjectMapper()
    mapper: Mapper
  ) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper,Communities,LogoDto),
      createMap(mapper,Communities,CommunityCardDto),
      createMap(mapper,CommunitiesImages,CommunitiesImagesDto, forMember(
            (destination:CommunitiesImagesDto) => destination.Link,
            mapFrom((source : CommunitiesImages) => source.File)
        )
      ),
      createMap(mapper,Communities,CommunityDto),
      createMap(mapper,CommunityMediaCreateDto,CommunitiesMedia),
      createMap(mapper,CommunitiesMedia,CommunityMediaCreateDto)

    };
  }

}

