import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { ArtworkService } from '../business/services/artwork.service';

import { ListArtworkDto } from '../business/models/artwork/list-artwork.dto';
import { ArtworkDto } from '../business/models/artwork/artwork.dto';
import { ArtworkQuery } from './queries/artwork.query';
import { ListResponse } from '@business/models/list-response.model';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  getArtworkById(@Param('id') id: number): Promise<ArtworkDto> {
    return this.artworkService.getArtworkById(id);
  }

  @Get()
  getAllArtwork(@Query() query: ArtworkQuery): Promise<ListResponse<ListArtworkDto>> {
    return this.artworkService.getAllArtwork(query);
  }

  @Post()
  addArtwork(@Body() artwork: ArtworkDto) {
    return this.artworkService.addArtwork(artwork);
  }

  @Put(':id')
  updateArtwork(@Param('id') id: number, @Body() artwork: ArtworkDto) {
    artwork.id = id;
    return this.artworkService.updateArtwork(artwork);
  }

  @Delete(':id')
  deleteArtwork(@Param('id') id: number) {
    return this.artworkService.deleteArtwork(id);
  }
}
