import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ArtworkService } from 'src/business/services/artwork.service';
import { Artwork } from 'src/dal/entity/artwork.entity';
import { CreateArtworkDto } from './models/create-artwork.dto';
import { UpdateArtworkDto } from './models/update-artwork.dto';

@Controller()
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  async getArtworkById(@Param('id') id: number): Promise<Artwork> {
    return this.artworkService.getArtworkById(id);
  }

  @Get()
  async getAllArtwork(): Promise<Artwork[]> {
    return this.artworkService.getAllArtwork();
  }

  @Post()
  async addArtwork(@Body() createArtDto: CreateArtworkDto) {
    return this.artworkService.addArtwork(createArtDto);
  }

  @Put()
  async updateArtwork(@Body() updateArtDto: UpdateArtworkDto) {
    return this.artworkService.addArtwork(updateArtDto);
  }
}
