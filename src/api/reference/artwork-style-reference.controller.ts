import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtworkStyle } from '@dal/entity/reference/artwork-style.entity';
import { ArtworkStyleReferenceService } from '@business/services/reference/artwork-style-reference.service';

@Controller('reference/artworkStyles')
export class ArtworkStyleReferenceController {
  constructor(private genreService: ArtworkStyleReferenceService) {}

  @Get()
  getAllStyles(@Query() query: ReferenceQuery<ArtworkStyle>): Promise<Option[]> {
    return this.genreService.getAllAsOptions(query);
  }
}
