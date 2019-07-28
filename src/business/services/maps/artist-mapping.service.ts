import { Injectable } from '@nestjs/common';

import { ArtistDto } from '../../models/artist/artist.dto';
import { Artist } from '../../../dal/entity/artist.entity';

@Injectable()
export class ArtistMappingService {
  mapToArtistDto(artist: Artist): ArtistDto {
    const artistDto = new ArtistDto();

    artistDto.id = artist.id;
    artistDto.identity = artist.name;
    artistDto.role = artist.role;

    return artistDto;
  }

  mapToArtistsDto(artists: Artist[]): ArtistDto[] {
    return artists.map(this.mapToArtistDto);
  }
}
