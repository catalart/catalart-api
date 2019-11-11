import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { Genre } from '@dal/entity/reference/genre.entity';
import { ApiQuery } from '@api/queries/api.query';
import { GenreRepository } from '@dal/repositories/genre.repository';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ReferenceService } from './reference.service';

@Injectable()
export class GenreReferenceService implements ReferenceService<Genre> {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: GenreRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<Genre>): Promise<Option[]> {
    const allTerms = await this.genreRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
