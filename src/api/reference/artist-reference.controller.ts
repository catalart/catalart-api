import { Controller, Get } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ArtistService } from '@business/services/artist.service';
import { ArtistQuery } from '@api/queries/artist.query';

@Controller('reference/artists')
export class ArtistReferenceController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(query: ArtistQuery): Promise<Option[]> {
    return this.artistService.getAllArtistsAsOptions(query);
  }
}
