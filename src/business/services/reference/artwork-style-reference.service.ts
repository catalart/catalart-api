import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ReferenceService } from './reference.service';
import { ArtworkStyle } from '@dal/entity/reference/artwork-style.entity';
import { ArtworkStyleRepository } from '@dal/repositories/artwork-style.repository';

@Injectable()
export class ArtworkStyleReferenceService implements ReferenceService<ArtworkStyle> {
  constructor(
    @InjectRepository(ArtworkStyle)
    private readonly artworkStyleRepository: ArtworkStyleRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<ArtworkStyle>): Promise<Option[]> {
    const allTerms = await this.artworkStyleRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
