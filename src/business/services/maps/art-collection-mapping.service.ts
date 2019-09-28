import { Injectable } from '@nestjs/common';

import { ArtworkService } from '../artwork.service';

import { CreateArtCollectionDto } from '../../models/art-collection/create-art-collection.dto';
import { UpdateArtCollectionDto } from '../../models/art-collection/update-art-collection.dto';

import { ArtCollection } from '../../../dal/entity/art-collection.entity';
import { GetArtCollectionDto } from '../../models/art-collection/get-art-collection.dto';
import { ListArtCollectionDto } from '../../models/art-collection/list-art-collection.dto';
import { Option } from '../../models/option.model';

@Injectable()
export class ArtCollectionMappingService {
  constructor(private readonly artworkService: ArtworkService) {}

  async mapToGetArtCollection(artCollection: ArtCollection): Promise<GetArtCollectionDto> {
    const getArtCollection = new GetArtCollectionDto();

    getArtCollection.id = artCollection.id;
    getArtCollection.description = artCollection.description;
    getArtCollection.location = artCollection.location;
    getArtCollection.name = artCollection.name;
    getArtCollection.type = artCollection.type;
    const artwork = await artCollection.artwork;
    getArtCollection.artwork = artwork.map(art => new Option(art.id, art.title));

    return Promise.resolve(getArtCollection);
  }

  mapToListArtCollection(artCollections: ArtCollection[]): Promise<ListArtCollectionDto[]> {
    const artCollectionList = artCollections.map(collection => ({
      id: collection.id,
      location: collection.location,
      name: collection.name
    }));
    return Promise.resolve(artCollectionList);
  }

  async mapFromCreatedArtCollection(createdArtCollection: CreateArtCollectionDto): Promise<ArtCollection> {
    const artCollection = new ArtCollection();

    artCollection.name = createdArtCollection.name;
    artCollection.type = createdArtCollection.type;
    artCollection.description = createdArtCollection.description;
    artCollection.location = createdArtCollection.location;
    if ((createdArtCollection.artwork || []).length > 0) {
      const artwork = this.artworkService.getArtworkByIds(createdArtCollection.artwork.map(a => a.id));
      artCollection.artwork = artwork;
    }

    return Promise.resolve(artCollection);
  }

  async mapFromUpdatedArtCollection(
    updatedArtCollection: UpdateArtCollectionDto,
    existingArtCollection: ArtCollection
  ): Promise<ArtCollection> {
    existingArtCollection.name = updatedArtCollection.name;
    existingArtCollection.type = updatedArtCollection.type;
    existingArtCollection.description = updatedArtCollection.description;
    existingArtCollection.location = updatedArtCollection.location;
    if ((updatedArtCollection.artwork || []).length > 0) {
      const artwork = this.artworkService.getArtworkByIds(updatedArtCollection.artwork.map(a => a.id));
      existingArtCollection.artwork = artwork;
    } else {
      existingArtCollection.artwork = Promise.resolve([]);
    }

    return Promise.resolve(existingArtCollection);
  }
}
