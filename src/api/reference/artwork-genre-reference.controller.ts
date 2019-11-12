import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ArtworkGenre } from '@dal/entity/reference/artwork-genre.entity';
import { ArtworkGenreReferenceService } from '@business/services/reference/artwork-genre-reference.service';
import { ReferenceQuery } from '@api/queries/reference.query';

@Controller('reference/artworkGenres')
export class ArtworkGenreReferenceController {
  constructor(private genreService: ArtworkGenreReferenceService) {}

  @Get()
  getAllGenres(@Query() query: ReferenceQuery<ArtworkGenre>): Promise<Option[]> {
    return this.genreService.getAll(query);
  }
}
