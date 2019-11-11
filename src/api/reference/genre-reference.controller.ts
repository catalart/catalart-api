import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { Genre } from '@dal/entity/reference/genre.entity';
import { GenreReferenceService } from '@business/services/reference/genre-reference.service';
import { ReferenceQuery } from '@api/queries/reference.query';

@Controller('reference/genre')
export class GenreReferenceController {
  constructor(private genreService: GenreReferenceService) {}

  @Get()
  getAllGenres(@Query() query: ReferenceQuery<Genre>): Promise<Option[]> {
    return this.genreService.getAll(query);
  }
}
