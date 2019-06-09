import { Controller, Get, Param, Post, Body, Put, UseGuards } from '@nestjs/common';

import { ArtCollectionService } from 'src/business/services/art-collection.service';

import { ListArtCollectionDto } from './models/art-collection/list-art-collection.dto';
import { UpdateArtCollectionDto } from './models/art-collection/update-art-collection.dto';
import { CreateArtCollectionDto } from './models/art-collection/create-art-collection.dto';
import { GetArtCollectionDto } from './models/art-collection/get-art-collection.dto';

@Controller()
export class ArtCollectionController {
  constructor(private artCollectionService: ArtCollectionService) {}

  @Get(':id')
  async getArtCollectionById(@Param('id') id: number): Promise<GetArtCollectionDto> {
    return this.artCollectionService.getArtCollectionById(id);
  }

  @Get()
  async getAllArtwork(): Promise<ListArtCollectionDto[]> {
    return this.artCollectionService.getAllArtCollections();
  }

  @Post()
  @UseGuards()
  async addArtCollection(@Body() createArtCollectionDto: CreateArtCollectionDto) {
    return this.artCollectionService.addArtCollection(createArtCollectionDto);
  }

  @Put()
  @UseGuards()
  async updateArtCollection(@Body() updateArtCollectionDto: UpdateArtCollectionDto) {
    return this.artCollectionService.addArtCollection(updateArtCollectionDto);
  }
}
