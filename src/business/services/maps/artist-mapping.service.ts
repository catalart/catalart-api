import { Injectable } from '@nestjs/common';

import { ArtistDto } from '../../models/artist/artist.dto';
import { Artist } from '../../../dal/entity/artist.entity';
import { Option } from '@business/models/option.model';
import { ReferenceMappingService } from './reference-mapping.service';
import { GetArtistDto } from '@business/models/artist/get-artist.dto';
import { ArtInstitutionService } from '../art-institution.service';
import { ArtMovementService } from '../art-movement.service';

@Injectable()
export class ArtistMappingService {
  constructor(
    private referenceMappingService: ReferenceMappingService,
    private artInstitutionService: ArtInstitutionService,
    private artMovementService: ArtMovementService
  ) {}

  async mapToArtistDto(artist: Artist): Promise<ArtistDto> {
    const artistDto = new ArtistDto();

    artistDto.id = artist.id;
    artistDto.identity = artist.name;
    artistDto.role = artist.role;
    artistDto.nationality = artist.nationality;
    artistDto.preview = { url: artist.preview };
    this.mapBirthDateAndPlace(artistDto, artist);
    this.mapDeathDateAndPlace(artistDto, artist);

    artistDto.artMovements = this.referenceMappingService.mapToOptions(await artist.artMovements);
    artistDto.artInstitutions = this.referenceMappingService.mapToOptions(await artist.artInstitutions);

    return Promise.resolve(artistDto);
  }

  private mapBirthDateAndPlace(artistDto: ArtistDto, artist: Artist): void {
    artistDto.born = {
      date: {
        isDateKnown: artist.isBirthDateKnown,
        isWithinARange: artist.isBirthDateWithinARange,
        startYear: artist.earliestKnownBirthDateYear,
        endYear: artist.latestKnownBirthDateYear,
        exactYear: artist.exactBirthDateYear
      },
      place: {
        isPlaceKnown: artist.isBirthPlaceKnown,
        location: artist.birthPlaceLocation
      }
    };
  }

  private mapDeathDateAndPlace(artistDto: ArtistDto, artist: Artist): void {
    artistDto.died = {
      date: {
        isDateKnown: artist.isDeathDateKnown,
        isWithinARange: artist.isDeathDateWithinARange,
        startYear: artist.earliestKnownDeathDateYear,
        endYear: artist.latestKnownDeathDateYear,
        exactYear: artist.exactDeathDateYear
      },
      place: {
        isPlaceKnown: artist.isDeathPlaceKnown,
        location: artist.deathPlaceLocation
      }
    };
  }

  mapToArtistsDto(artists: Artist[]): GetArtistDto[] {
    return artists.map(artist => ({
      id: artist.id,
      identity: artist.name,
      role: artist.role,
      preview: artist.preview
    }));
  }

  mapToOptions(artists: Artist[]): Option[] {
    return artists.map(artist => new Option(artist.id, artist.name));
  }

  mapFromCreatedArtist(createdArtist: ArtistDto): Artist {
    const artist = new Artist();

    artist.name = createdArtist.identity;
    artist.preview = createdArtist.preview ? createdArtist.preview.url : '';
    artist.role = createdArtist.role;
    artist.nationality = createdArtist.nationality;
    this.setBirthDateAndPlace(artist, createdArtist);
    this.setDeathDateAndPlace(artist, createdArtist);
    if (createdArtist.artInstitutions.length > 0) {
      artist.artInstitutions = this.artInstitutionService.findInstitutionsByIds(createdArtist.artInstitutions);
    }
    if (createdArtist.artMovements.length > 0) {
      artist.artMovements = this.artMovementService.findArtMovementsByIds(createdArtist.artMovements);
    }

    return artist;
  }

  mapFromUpdatedArtist(createdArtist: ArtistDto, existingArtist: Artist): Artist {
    existingArtist.name = createdArtist.identity;
    existingArtist.preview = createdArtist.preview ? createdArtist.preview.url : '';
    existingArtist.role = createdArtist.role;
    existingArtist.nationality = createdArtist.nationality;
    this.setBirthDateAndPlace(existingArtist, createdArtist);
    this.setDeathDateAndPlace(existingArtist, createdArtist);
    existingArtist.artInstitutions = this.artInstitutionService.findInstitutionsByIds(createdArtist.artInstitutions);
    existingArtist.artMovements = this.artMovementService.findArtMovementsByIds(createdArtist.artMovements);

    return existingArtist;
  }

  private setBirthDateAndPlace(artist: Artist, createdArtist: ArtistDto) {
    if (createdArtist.born && createdArtist.born.date) {
      artist.isBirthDateKnown = createdArtist.born.date.isDateKnown;
      artist.isBirthDateWithinARange = createdArtist.born.date.isWithinARange;
      artist.earliestKnownBirthDateYear = createdArtist.born.date.startYear;
      artist.latestKnownBirthDateYear = createdArtist.born.date.endYear;
      artist.exactBirthDateYear = createdArtist.born.date.exactYear;
    }
    if (createdArtist.born && createdArtist.born.place) {
      artist.isBirthPlaceKnown = createdArtist.born.place.isPlaceKnown;
      artist.birthPlaceLocation = createdArtist.born.place.location;
    }
  }

  private setDeathDateAndPlace(artist: Artist, createdArtist: ArtistDto) {
    if (createdArtist.died && createdArtist.died.date) {
      artist.isDeathDateKnown = createdArtist.died.date.isDateKnown;
      artist.isDeathDateWithinARange = createdArtist.died.date.isWithinARange;
      artist.earliestKnownDeathDateYear = createdArtist.died.date.startYear;
      artist.latestKnownDeathDateYear = createdArtist.died.date.endYear;
      artist.exactDeathDateYear = createdArtist.died.date.exactYear;
    }
    if (createdArtist.died && createdArtist.died.place) {
      artist.isDeathPlaceKnown = createdArtist.died.place.isPlaceKnown;
      artist.deathPlaceLocation = createdArtist.died.place.location;
    }
  }
}
