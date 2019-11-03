import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { ArtworkService } from '../business/services/artwork.service';

import { ListArtworkDto } from '../business/models/artwork/list-artwork.dto';
import { UpdateArtworkDto } from '../business/models/artwork/update-artwork.dto';
import { GetArtWorkDto } from '../business/models/artwork/get-artwork.dto';
import { CreateArtworkDto } from '../business/models/artwork/create-artwork.dto';
import { ApiQuery } from './queries/api.query';
import { Artwork } from '@dal/entity/artwork.entity';
import { ArtworkQuery } from './queries/artwork.query';
import { ListResponse } from '@business/models/list-response.model';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  getArtworkById(@Param('id') id: number): Promise<GetArtWorkDto> {
    return this.artworkService.getArtworkById(id);
  }

  @Get()
  getAllArtwork(@Query() query: ArtworkQuery): Promise<ListResponse<ListArtworkDto>> {
    return this.artworkService.getAllArtwork(query);
  }

  @Post()
  addArtwork(@Body() createArtDto: CreateArtworkDto) {
    return this.artworkService.addArtwork(createArtDto);
  }

  @Put(':id')
  updateArtwork(@Param('id') id: number, @Body() updateArtDto: UpdateArtworkDto) {
    updateArtDto.id = id;
    return this.artworkService.updateArtwork(updateArtDto);
  }

  @Delete(':id')
  deleteArtwork(@Param('id') id: number) {
    return this.artworkService.deleteArtwork(id);
  }
}
