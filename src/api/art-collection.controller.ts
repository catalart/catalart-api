import { Controller, Get, Param, Post, Body, Put, UseGuards, Delete, Query } from '@nestjs/common';

import { ArtCollectionService } from '../business/services/art-collection.service';

import { ListArtCollectionDto } from '../business/models/art-collection/list-art-collection.dto';
import { UpdateArtCollectionDto } from '../business/models/art-collection/update-art-collection.dto';
import { CreateArtCollectionDto } from '../business/models/art-collection/create-art-collection.dto';
import { GetArtCollectionDto } from '../business/models/art-collection/get-art-collection.dto';
import { ArtCollectionQuery } from './queries/art-collection.query';

@Controller('art-collection')
export class ArtCollectionController {
  constructor(private artCollectionService: ArtCollectionService) {}

  @Get(':id')
  async getArtCollectionById(@Param('id') id: number): Promise<GetArtCollectionDto> {
    return this.artCollectionService.getArtCollectionById(id);
  }

  @Get()
  async getAllArtwork(@Query() query: ArtCollectionQuery): Promise<ListArtCollectionDto[]> {
    return this.artCollectionService.getAllArtCollections(query);
  }

  @Post()
  async addArtCollection(@Body() createArtCollectionDto: CreateArtCollectionDto) {
    return this.artCollectionService.addArtCollection(createArtCollectionDto);
  }

  @Put(':id')
  async updateArtCollection(@Param('id') id: number, @Body() updateArtCollectionDto: UpdateArtCollectionDto) {
    updateArtCollectionDto.id = id;
    return this.artCollectionService.saveArtCollection(updateArtCollectionDto);
  }

  @Delete(':id')
  deleteArtCollection(@Param('id') id: number) {
    return this.artCollectionService.deleteArtCollection(id);
  }
}
