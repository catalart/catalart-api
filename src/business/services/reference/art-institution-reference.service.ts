import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ArtInstitutionRepository } from '@dal/repositories/art-institution.repository';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';
import { ReferenceService } from './reference.service';

@Injectable()
export class ArtInstitutionReferenceService implements ReferenceService<ArtInstitution> {
  constructor(
    @InjectRepository(ArtInstitution)
    private readonly artInstitutionRepository: ArtInstitutionRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<ArtInstitution>): Promise<Option[]> {
    const allTerms = await this.artInstitutionRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
