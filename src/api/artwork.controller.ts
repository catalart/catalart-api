import { Controller, Get, Param, Post, Body, Put, UseGuards } from '@nestjs/common';

import { ArtworkService } from '../business/services/artwork.service';

import { CreateArtworkDto } from '../business/models/artwork/create-artwork.dto';
import { ListArtworkDto } from '../business/models/artwork/list-art-collection.dto';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  // @Get(':id')
  // getArtworkById(@Param('id') id: number): Promise<GetArtWorkDto> {
  //   return this.artworkService.getArtworkById(id);
  // }

  @Get()
  getAllArtwork(): Promise<ListArtworkDto[]> {
    return this.artworkService.getAllArtwork();
  }

  @Post()
  @UseGuards()
  addArtwork(@Body() createArtDto: CreateArtworkDto) {
    return this.artworkService.addArtwork(createArtDto);
  }
}
