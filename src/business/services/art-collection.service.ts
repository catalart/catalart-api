import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { ArtCollection } from '../../dal/entity/art-collection.entity';
import { CreateArtCollectionDto } from '../models/art-collection/create-art-collection.dto';
import { ArtCollectionMappingService } from './maps/art-collection-mapping.service';
import { UpdateArtCollectionDto } from '../models/art-collection/update-art-collection.dto';

@Injectable()
export class ArtCollectionService {
  constructor(
    @InjectRepository(ArtCollection)
    private readonly artCollectionRepository: Repository<ArtCollection>,
    private readonly artCollectionMappingService: ArtCollectionMappingService
  ) {}

  getArtCollectionById(id: number): Promise<ArtCollection> {
    return this.artCollectionRepository.findOne(id);
  }

  getAllArtCollections(): Promise<ArtCollection[]> {
    return this.artCollectionRepository.find();
  }

  async addArtCollection(createdArtCollection: CreateArtCollectionDto): Promise<ArtCollection> {
    const artCollection = await this.artCollectionMappingService.mapFromCreatedArtCollection(createdArtCollection);
    return this.artCollectionRepository.save(artCollection);
  }

  async saveArtCollection(updatedArtCollection: UpdateArtCollectionDto): Promise<ArtCollection> {
    const existingArtCollection = await this.artCollectionRepository.findOneOrFail(updatedArtCollection.id, { relations: ['artwork'] });
    const artCollection = await this.artCollectionMappingService.mapFromUpdatedArtCollection(updatedArtCollection, existingArtCollection);
    return this.artCollectionRepository.save(artCollection);
  }
}
