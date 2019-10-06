import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArtCollection } from '@dal/entity/art-collection.entity';
import { CreateArtCollectionDto } from '../models/art-collection/create-art-collection.dto';
import { ArtCollectionMappingService } from './maps/art-collection-mapping.service';
import { UpdateArtCollectionDto } from '../models/art-collection/update-art-collection.dto';
import { GetArtCollectionDto } from '../models/art-collection/get-art-collection.dto';
import { ListArtCollectionDto } from '../models/art-collection/list-art-collection.dto';

@Injectable()
export class ArtCollectionService {
  constructor(
    @InjectRepository(ArtCollection)
    private readonly artCollectionRepository: Repository<ArtCollection>,
    private readonly artCollectionMappingService: ArtCollectionMappingService
  ) {}

  async getArtCollectionById(id: number): Promise<GetArtCollectionDto> {
    const artCollection = await this.artCollectionRepository.findOneOrFail(id, { relations: ['artwork'] });
    return this.artCollectionMappingService.mapToGetArtCollection(artCollection);
  }

  async getAllArtCollections(): Promise<ListArtCollectionDto[]> {
    const allArtCollections = await this.artCollectionRepository.find();
    return this.artCollectionMappingService.mapToListArtCollection(allArtCollections);
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

  async deleteArtCollection(artCollectionId: number) {
    const originalArtCollection = await this.artCollectionRepository.findOneOrFail(artCollectionId);
    return this.artCollectionRepository.remove(originalArtCollection);
  }
}
