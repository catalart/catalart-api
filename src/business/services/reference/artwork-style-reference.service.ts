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
    return this.artworkStyleRepository.findOneOrFail(itemId);
  }

  async addItem(item: ArtworkStyle): Promise<ArtworkStyle> {
    return this.artworkStyleRepository.save(item);
  }

  updateItem(itemId: number, item: ArtworkStyle): Promise<UpdateResult> {
    return this.artworkStyleRepository.update({ id: itemId }, item);
  }

  deleteItem(itemId: number): Promise<DeleteResult> {
    return this.artworkStyleRepository.delete({ id: itemId });
  }
}
