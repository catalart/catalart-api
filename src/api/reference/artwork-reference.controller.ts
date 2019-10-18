import { Controller, Get } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ArtworkQuery } from '@api/queries/artwork.query';
import { ArtworkService } from '@business/services/artwork.service';

@Controller('reference/artwork')
export class ArtworkReferenceController {
  constructor(private artworkService: ArtworkService) {}

  @Get()
  getAllArtists(query: ArtworkQuery): Promise<Option[]> {
    return this.artworkService.getAllArtworkAsOptions(query);
  }
}
