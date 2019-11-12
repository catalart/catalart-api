import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ArtworkGenre } from '@dal/entity/reference/artwork-genre.entity';
import { ApiQuery } from '@api/queries/api.query';
import { ArtworkGenreRepository } from '@dal/repositories/artwork-genre.repository';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ReferenceService } from './reference.service';

@Injectable()
export class ArtworkGenreReferenceService implements ReferenceService<ArtworkGenre> {
  constructor(
    @InjectRepository(ArtworkGenre)
    private readonly genreRepository: ArtworkGenreRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<ArtworkGenre>): Promise<Option[]> {
    const allTerms = await this.genreRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
