import { Controller, Get } from '@nestjs/common';

import { ArtistDto } from '../business/models/artist/artist.dto';
import { ArtistService } from '../business/services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists();
  }
}
