import { Injectable } from '@nestjs/common';

import { ArtistService } from '../artist.service';
import { TagService } from '../tag.service';

import { CreateArtworkDto } from '../../models/artwork/create-artwork.dto';
import { Artwork } from '../../../dal/entity/artwork.entity';
import { UpdateArtworkDto } from '../../models/artwork/update-artwork.dto';
import { CreationDateDto } from '../../models/creation-date.dto';
import { ListArtworkDto } from '../../models/artwork/list-art-collection.dto';
import { GetArtWorkDto } from '../../models/artwork/get-artwork.dto';
import { TagMappingService } from './tag-mapping.service';
import { ArtistMappingService } from './artist-mapping.service';
import { Option } from '@business/models/option.model';

@Injectable()
export class ArtworkMappingService {
  constructor(
    private readonly tagService: TagService,
    private readonly artistService: ArtistService,
    private readonly tagMappingService: TagMappingService,
    private readonly artistMappingService: ArtistMappingService
  ) {}

  async mapFromCreatedArtwork(createdArtwork: CreateArtworkDto): Promise<Artwork> {
    const artwork = new Artwork();

    artwork.classificationTerm = createdArtwork.classificationTerm;
    artwork.title = createdArtwork.title;
    artwork.dimensions = createdArtwork.dimensions;
    artwork.materialsAndTechniquesDescription = createdArtwork.materialsAndTechniquesDescription;
    const tags = await this.tagService.addTags(createdArtwork.generalSubjectTerms);
    artwork.generalSubjectTerms = Promise.resolve(tags);
    const artist = await this.artistService.getOrCreateArtist(createdArtwork.creator);
    artwork.creator = Promise.resolve(artist);
    artwork.creationDate = CreationDateDto.to(createdArtwork.creationDate);
    artwork.currentLocation = createdArtwork.currentLocation;
    artwork.preview = createdArtwork.preview;
    artwork.citation = createdArtwork.citation;

    return Promise.resolve(artwork);
  }

  async mapFromUpdatedArtwork(updatedArtwork: UpdateArtworkDto, artwork: Artwork): Promise<Artwork> {
    artwork.classificationTerm = updatedArtwork.classificationTerm;
    artwork.title = updatedArtwork.title;
    artwork.dimensions = updatedArtwork.dimensions;
    artwork.materialsAndTechniquesDescription = updatedArtwork.materialsAndTechniquesDescription;
    const tags = await this.tagService.updateTags(updatedArtwork.id, updatedArtwork.generalSubjectTerms);
    artwork.generalSubjectTerms = Promise.resolve(tags);
    const artist = await this.artistService.getOrCreateArtist(updatedArtwork.creator);
    artwork.creator = Promise.resolve(artist);
    artwork.creationDate = CreationDateDto.to(updatedArtwork.creationDate);
    artwork.currentLocation = updatedArtwork.currentLocation;
    artwork.preview = updatedArtwork.preview;
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
          creationDate: artwork.creationDate,
          creatorIdentity: artist.name,
          preview: artwork.preview
        });
      })
    );
  }

  mapFromArtworkToOptions(artworkList: Artwork[]): Promise<Option[]> {
    return Promise.all(artworkList.map((artwork: Artwork) => new Option(artwork.id, artwork.title)));
  }

  async mapToGetArtwork(artwork: Artwork): Promise<GetArtWorkDto> {
    const artworkToGet = new GetArtWorkDto();

    artworkToGet.id = artwork.id;
    artworkToGet.classificationTerm = artwork.classificationTerm;
    artworkToGet.title = artwork.title;
    artworkToGet.dimensions = artwork.dimensions;
    artworkToGet.materialsAndTechniquesDescription = artwork.materialsAndTechniquesDescription;
    const tags = await artwork.generalSubjectTerms;
    artworkToGet.generalSubjectTerms = this.tagMappingService.mapTagsToStrings(tags);
    const artist = await artwork.creator;
    artworkToGet.creator = this.artistMappingService.mapToArtistDto(artist);
    artworkToGet.creationDate = CreationDateDto.from(artwork.creationDate);
    artworkToGet.currentLocation = artwork.currentLocation;
    artworkToGet.preview = artwork.preview;
    artworkToGet.citation = artwork.citation;

    return Promise.resolve(artworkToGet);
  }
}
