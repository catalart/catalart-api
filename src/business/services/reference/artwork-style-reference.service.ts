import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ReferenceService } from './reference.service';
import { ArtworkStyle } from '@dal/entity/reference/artwork-style.entity';
import { ArtworkStyleRepository } from '@dal/repositories/artwork-style.repository';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtworkStyleReferenceService implements ReferenceService<ArtworkStyle> {
  constructor(
    @InjectRepository(ArtworkStyle)
    private readonly artworkStyleRepository: ArtworkStyleRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAllAsOptions(query: ApiQuery<ArtworkStyle>): Promise<Option[]> {
    const allTerms = await this.artworkStyleRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }

  async getAllAsItems(query: ApiQuery<ArtworkStyle>): Promise<ListResponse<ReferenceEntity>> {
    return this.artworkStyleRepository
      .search(query)
      .then(results => Promise.resolve(new ListResponse<ReferenceEntity>(results, results.length)));
  }

  getItem(itemId: number): Promise<ArtworkStyle> {
    return this.artworkStyleRepository.findByIdOrFail(itemId);
  }

  async addItem(item: ReferenceEntity): Promise<ArtworkStyle> {
    return this.artworkStyleRepository.save(item);
  }

  async updateItem(itemId: number, item: ReferenceEntity): Promise<ArtworkStyle> {
    const dbItem = await this.getItem(itemId);
    const updatedItem = {
      ...dbItem,
      name: item.name,
      description: item.description,
      label: item.label
    };
    return this.artworkStyleRepository.save(updatedItem);
  }

  async deleteItem(itemId: number): Promise<ArtworkStyle[]> {
    const dbItem = await this.getItem(itemId);
    return this.artworkStyleRepository.remove([dbItem]);
  }
}
