import { Injectable } from '@nestjs/common';

import { ArtworkService } from '../artwork.service';

import { CreateArtCollectionDto } from '../../models/art-collection/create-art-collection.dto';
import { UpdateArtCollectionDto } from '../../models/art-collection/update-art-collection.dto';

import { ArtCollection } from '../../../dal/entity/art-collection.entity';

@Injectable()
export class ArtCollectionMappingService {
  constructor(private readonly artworkService: ArtworkService) {}

  async mapFromCreatedArtCollection(createdArtCollection: CreateArtCollectionDto): Promise<ArtCollection> {
    const artCollection = new ArtCollection();

    artCollection.name = createdArtCollection.name;
    artCollection.type = createdArtCollection.type;
    artCollection.description = createdArtCollection.description;
    artCollection.location = createdArtCollection.location;
    const artwork = this.artworkService.getArtworkByIds(createdArtCollection.artwork.map(a => a.id));
    artCollection.artwork = artwork;

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
    const artwork = this.artworkService.getArtworkByIds(updatedArtCollection.artwork.map(a => a.id));
    existingArtCollection.artwork = artwork;

    return Promise.resolve(existingArtCollection);
  }
}
