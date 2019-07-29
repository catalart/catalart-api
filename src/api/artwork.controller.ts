import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { ArtworkService } from '../business/services/artwork.service';

import { ListArtworkDto } from '../business/models/artwork/list-art-collection.dto';
import { UpdateArtworkDto } from '../business/models/artwork/update-artwork.dto';
import { GetArtWorkDto } from '../business/models/artwork/get-artwork.dto';
import { CreateArtworkDto } from '../business/models/artwork/create-artwork.dto';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  getArtworkById(@Param('id') id: number): Promise<GetArtWorkDto> {
    return this.artworkService.getArtworkById(id);
  }

  @Get()
  getAllArtwork(): Promise<ListArtworkDto[]> {
    return this.artworkService.getAllArtwork();
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
