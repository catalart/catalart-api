import { Controller, Get, Param, Post, Body, Put, UseGuards } from '@nestjs/common';

import { ArtworkService } from 'src/business/services/artwork.service';

import { CreateArtworkDto } from './models/artwork/create-artwork.dto';
import { UpdateArtworkDto } from './models/artwork/update-artwork.dto';
import { ListArtworkDto } from './models/artwork/list-art-collection.dto';
import { GetArtWorkDto } from './models/artwork/get-artwork.dto';

@Controller()
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  async getArtworkById(@Param('id') id: number): Promise<GetArtWorkDto> {
    return this.artworkService.getArtworkById(id);
  }

  @Get()
  async getAllArtwork(): Promise<ListArtworkDto[]> {
    return this.artworkService.getAllArtwork();
  }

  @Post()
  @UseGuards()
  async addArtwork(@Body() createArtDto: CreateArtworkDto) {
    return this.artworkService.addArtwork(createArtDto);
  }

  @Put()
  @UseGuards()
  async updateArtwork(@Body() updateArtDto: UpdateArtworkDto) {
    return this.artworkService.addArtwork(updateArtDto);
  }
}
