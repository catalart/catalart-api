import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ArtMovementRepository } from '@dal/repositories/art-movement.repository';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';
import { ReferenceService } from './reference.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtMovementReferenceService implements ReferenceService<ArtMovement> {
  constructor(
    @InjectRepository(ArtMovement)
    private readonly artMovementRepository: ArtMovementRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAllAsOptions(query: ApiQuery<ArtMovement>): Promise<Option[]> {
    const allTerms = await this.artMovementRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }

  async getAllAsItems(query: ApiQuery<ArtMovement>): Promise<ListResponse<ReferenceEntity>> {
    return this.artMovementRepository
      .search(query)
      .then(results => Promise.resolve(new ListResponse<ReferenceEntity>(results, results.length)));
  }

  getItem(itemId: number): Promise<ArtMovement> {
    return this.artMovementRepository.findOneOrFail(itemId);
  }

  async addItem(item: ArtMovement): Promise<ArtMovement> {
    return this.artMovementRepository.save(item);
  }

  updateItem(itemId: number, item: ArtMovement): Promise<UpdateResult> {
    return this.artMovementRepository.update({ id: itemId }, item);
  }

  deleteItem(itemId: number): Promise<DeleteResult> {
    return this.artMovementRepository.delete({ id: itemId });
  }
}
