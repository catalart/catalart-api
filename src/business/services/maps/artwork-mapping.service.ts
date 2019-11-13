import { Injectable } from '@nestjs/common';

import { ArtistService } from '../artist.service';

import { ArtworkDto } from '@business/models/artwork/artwork.dto';
import { Artwork } from '@dal/entity/artwork.entity';
import { ListArtworkDto } from '@business/models/artwork/list-artwork.dto';
import { TagMappingService } from './tag-mapping.service';
import { ArtistMappingService } from './artist-mapping.service';
import { Option } from '@business/models/option.model';
import { ReferenceMappingService } from './reference-mapping.service';
import { Tag } from '@dal/entity/tag.entity';

@Injectable()
export class ArtworkMappingService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly tagMappingService: TagMappingService,
    private readonly artistMappingService: ArtistMappingService,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async mapFromCreatedArtwork(createdArtwork: ArtworkDto): Promise<Artwork> {
    const artwork = new Artwork();

    artwork.genreId = createdArtwork.genre.id;
    artwork.styleId = createdArtwork.style.id;
    artwork.title = createdArtwork.title;
    artwork.dimensions = createdArtwork.dimensions;
    artwork.medium = createdArtwork.medium;
    const tags = createdArtwork.generalSubjectTerms.map(term => Object.assign(new Tag(), { tag: term }));
    artwork.generalSubjectTerms = Promise.resolve(tags);
    if (!!createdArtwork.creator.id) {
      artwork.creatorId = createdArtwork.creator.id;
    } else {
      const artist = await this.artistService.addArtist(createdArtwork.creator);
      artwork.creatorId = artist.id;
    }
    this.setCreationDateAndPlace(artwork, createdArtwork);
    artwork.currentLocation = createdArtwork.currentLocation;
    artwork.preview = createdArtwork.preview ? createdArtwork.preview.url : '';
    artwork.citation = createdArtwork.citation;

    return Promise.resolve(artwork);
  }

  private setCreationDateAndPlace(artwork: Artwork, artworkDto: ArtworkDto) {
    if (artworkDto.creationDate && artworkDto.creationDate.date) {
      artwork.isCreationDateKnown = artworkDto.creationDate.date.isDateKnown;
      artwork.isCreationDateWithinARange = artworkDto.creationDate.date.isWithinARange;
      artwork.earliestKnownCreationDateYear = artworkDto.creationDate.date.startYear;
      artwork.latestKnownCreationDateYear = artworkDto.creationDate.date.endYear;
      artwork.exactCreationDateYear = artworkDto.creationDate.date.exactYear;
    }
    if (artworkDto.creationDate && artworkDto.creationDate.place) {
      artwork.isCreationPlaceKnown = artworkDto.creationDate.place.isPlaceKnown;
      artwork.creationPlaceLocation = artworkDto.creationDate.place.location;
    }
  }

  async mapFromUpdatedArtwork(updatedArtwork: ArtworkDto, artwork: Artwork): Promise<Artwork> {
    artwork.genreId = updatedArtwork.genre.id;
    artwork.styleId = updatedArtwork.style.id;
    artwork.title = updatedArtwork.title;
    artwork.dimensions = updatedArtwork.dimensions;
    artwork.medium = updatedArtwork.medium;
    const tags = updatedArtwork.generalSubjectTerms.map(term => Object.assign(new Tag(), { tag: term }));
    artwork.generalSubjectTerms = Promise.resolve(tags);
    if (!!updatedArtwork.creator.id) {
      artwork.creatorId = updatedArtwork.creator.id;
    } else {
      const artist = await this.artistService.addArtist(updatedArtwork.creator);
      artwork.creatorId = artist.id;
    }
    this.setCreationDateAndPlace(artwork, updatedArtwork);
    artwork.currentLocation = updatedArtwork.currentLocation;
    artwork.preview = updatedArtwork.preview ? updatedArtwork.preview.url : '';
    artwork.citation = updatedArtwork.citation;

    return Promise.resolve(artwork);
  }

  mapFromArtworkToList(artworkList: Artwork[]): Promise<ListArtworkDto[]> {
    return Promise.all(
      artworkList.map(async (artwork: Artwork) => {
        const artist = await artwork.creator;
        return Object.assign(new ListArtworkDto(), {
          id: artwork.id,
          title: artwork.title,
          creationDate: this.formatCreationDate(artwork),
          creatorIdentity: artist.name,
          preview: artwork.preview
        });
      })
    );
  }

  private formatCreationDate(artwork: Artwork): string {
    if (artwork.isCreationDateKnown) {
      if (artwork.isCreationDateWithinARange) {
        return `${artwork.earliestKnownCreationDateYear}-${artwork.latestKnownCreationDateYear}`;
      } else {
        return `${artwork.exactCreationDateYear}`;
      }
    } else {
      return 'n.d.';
    }
  }

  mapFromArtworkToOptions(artworkList: Artwork[]): Promise<Option[]> {
    return Promise.all(artworkList.map((artwork: Artwork) => new Option(artwork.id, artwork.title)));
  }

  async mapToGetArtwork(artwork: Artwork): Promise<ArtworkDto> {
    const artworkDto = new ArtworkDto();

    artworkDto.id = artwork.id;
    artworkDto.genre = this.referenceMappingService.mapToOption(await artwork.genre);
    artworkDto.style = this.referenceMappingService.mapToOption(await artwork.style);
    artworkDto.title = artwork.title;
    artworkDto.dimensions = artwork.dimensions;
    artworkDto.medium = artwork.medium;
    const tags = await artwork.generalSubjectTerms;
    artworkDto.generalSubjectTerms = this.tagMappingService.mapTagsToStrings(tags);
    const artist = await artwork.creator;
    artworkDto.creator = await this.artistMappingService.mapToArtistDto(artist);
    this.mapCreationDateAndPlace(artworkDto, artwork);
    artworkDto.currentLocation = artwork.currentLocation;
    artworkDto.preview = { url: artwork.preview };
    artworkDto.citation = artwork.citation;

    return Promise.resolve(artworkDto);
  }

  private mapCreationDateAndPlace(artworkDto: ArtworkDto, artwork: Artwork): void {
    artworkDto.creationDate = {
      date: {
        isDateKnown: artwork.isCreationDateKnown,
        isWithinARange: artwork.isCreationDateWithinARange,
        startYear: artwork.earliestKnownCreationDateYear,
        endYear: artwork.latestKnownCreationDateYear,
        exactYear: artwork.exactCreationDateYear
      },
      place: {
        isPlaceKnown: artwork.isCreationPlaceKnown,
        location: artwork.creationPlaceLocation
      }
    };
  }
}
