import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { ArtCollection } from 'src/dal/entity/art-collection.entity';

@Injectable()
export class ArtCollectionService {
  constructor(
    @InjectRepository(ArtCollection)
    private readonly artCollectionRepository: Repository<ArtCollection>,
  ) {}

  getArtCollectionById(id: number): Promise<ArtCollection> {
    return this.artCollectionRepository.findOne(id);
  }

  getAllArtCollections(): Promise<ArtCollection[]> {
    return this.artCollectionRepository.find();
  }

  addArtCollection(artCollection: DeepPartial<ArtCollection>) {
    return this.artCollectionRepository.save(artCollection);
  }

  saveArtCollection(artCollection: DeepPartial<ArtCollection>) {
    return this.artCollectionRepository.save(artCollection);
  }
}
