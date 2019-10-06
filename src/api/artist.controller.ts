import { Controller, Get, Delete, Put, Post, Body, Param } from '@nestjs/common';

import { ArtistDto } from '../business/models/artist/artist.dto';
import { ArtistService } from '../business/services/artist.service';
import { ArtistQuery } from './queries/artist.query';

@Controller('artists')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(query: ArtistQuery): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists(query);
  }

  @Get(':id')
  getArtistById(@Param('id') id: number): Promise<ArtistDto> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  addArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.addArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(@Param('id') id: number, @Body() updateArtistDto: ArtistDto) {
    updateArtistDto.id = id;
    return this.artistService.updateArtist(updateArtistDto);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: number) {
    return this.artistService.deleteArtist(id);
  }
}
