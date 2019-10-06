import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { ArtworkService } from '@business/services/artwork.service';

import { Option } from '@business/models/option.model';
import { ArtworkQuery } from '@api/queries/artwork.query';

@Controller('base/artwork')
export class BaseArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get()
  getAllArtwork(@Query() query: ArtworkQuery): Promise<Option[]> {
    return this.artworkService.getAllArtworkAsOptions(query);
  }
}
