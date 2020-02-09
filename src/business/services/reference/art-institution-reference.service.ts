import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ArtInstitutionRepository } from '@dal/repositories/art-institution.repository';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';
import { ReferenceService } from './reference.service';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtInstitutionReferenceService implements ReferenceService<ArtInstitution> {
  constructor(
    @InjectRepository(ArtInstitution)
    private readonly artInstitutionRepository: ArtInstitutionRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAllAsOptions(query: ApiQuery<ArtInstitution>): Promise<Option[]> {
    const allTerms = await this.artInstitutionRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }

  async getAllAsItems(query: ApiQuery<ArtInstitution>): Promise<ListResponse<ReferenceEntity>> {
    return this.artInstitutionRepository
      .search(query)
      .then(results => Promise.resolve(new ListResponse<ReferenceEntity>(results, results.length)));
  }

  getItem(itemId: number): Promise<ArtInstitution> {
    return this.artInstitutionRepository.findOneOrFail(itemId);
  }

  async addItem(item: ArtInstitution): Promise<ArtInstitution> {
    return this.artInstitutionRepository.save(item);
  }

  updateItem(itemId: number, item: ArtInstitution): Promise<UpdateResult> {
    return this.artInstitutionRepository.update({ id: itemId }, item);
  }

  deleteItem(itemId: number): Promise<DeleteResult> {
    return this.artInstitutionRepository.delete({ id: itemId });
  }
}
