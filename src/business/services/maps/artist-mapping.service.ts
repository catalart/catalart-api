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
    artistDto.preview = artist.preview;

    return artistDto;
  }

  mapToArtistsDto(artists: Artist[]): ArtistDto[] {
    return artists.map(this.mapToArtistDto);
  }

  mapFromCreatedArtist(createdArtist: ArtistDto): Artist {
    const artist = new Artist();

    artist.name = createdArtist.identity;
    artist.preview = createdArtist.preview;
    artist.role = createdArtist.role;

    return artist;
  }

  mapFromUpdatedArtist(createdArtist: ArtistDto, existingArtist: Artist): Artist {
    existingArtist.name = createdArtist.identity;
    existingArtist.preview = createdArtist.preview;
    existingArtist.role = createdArtist.role;

    return existingArtist;
  }
}
