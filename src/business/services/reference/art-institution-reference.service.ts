import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ArtInstitutionRepository } from '@dal/repositories/art-institution.repository';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';
import { ReferenceService } from './reference.service';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
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
    return this.artInstitutionRepository.findByIdOrFail(itemId);
  }

  async addItem(item: ReferenceEntity): Promise<ArtInstitution> {
    return this.artInstitutionRepository.save(item);
  }

  async updateItem(itemId: number, item: ReferenceEntity): Promise<ArtInstitution> {
    const dbItem = await this.getItem(itemId);
    const updatedItem = {
      ...dbItem,
      name: item.name,
      description: item.description,
      label: item.label
    };
    return this.artInstitutionRepository.save(updatedItem);
  }

  async deleteItem(itemId: number): Promise<ArtInstitution[]> {
    const dbItem = await this.getItem(itemId);
    return this.artInstitutionRepository.remove([dbItem]);
  }
}
