import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ArtMovementRepository } from '@dal/repositories/art-movement.repository';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';
import { ReferenceService } from './reference.service';

@Injectable()
export class ArtMovementReferenceService implements ReferenceService<ArtMovement> {
  constructor(
    @InjectRepository(ArtMovement)
    private readonly artMovementRepository: ArtMovementRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<ArtMovement>): Promise<Option[]> {
    const allTerms = await this.artMovementRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
