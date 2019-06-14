import { Controller, Get, Param, Post, Body, Put, UseGuards } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { ArtworkService } from 'src/business/services/artwork.service';

import { CreateArtworkDto } from './models/artwork/create-artwork.dto';
import { UpdateArtworkDto } from './models/artwork/update-artwork.dto';
import { ListArtworkDto } from './models/artwork/list-art-collection.dto';
import { GetArtWorkDto } from './models/artwork/get-artwork.dto';
import { Artwork } from 'src/dal/entity/artwork.entity';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Get(':id')
  async getArtworkById(@Param('id') id: number): Promise<GetArtWorkDto> {
    return this.artworkService
      .getArtworkById(id)
      .pipe(map(async artwork => await GetArtWorkDto.from(artwork)))
      .toPromise();
  }

  @Get()
  async getAllArtwork(): Promise<ListArtworkDto[]> {
    return this.artworkService
      .getAllArtwork()
      .pipe(map((artworkList: Artwork[]) => Promise.all(artworkList.map(async (artwork: Artwork) => await ListArtworkDto.from(artwork)))))
      .toPromise();
  }

  @Post()
  @UseGuards()
  async addArtwork(@Body() createArtDto: CreateArtworkDto) {
    const createdArtwork = CreateArtworkDto.to(createArtDto);
    return this.artworkService.addArtwork(createdArtwork);
  }
}
