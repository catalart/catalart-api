import { Controller, Get, Query, Post, Body, Put, Delete, Param } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ArtworkGenre } from '@dal/entity/reference/artwork-genre.entity';
import { ArtworkGenreReferenceService } from '@business/services/reference/artwork-genre-reference.service';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ListResponse } from '@business/models/list-response.model';

@Controller('reference/genres')
export class ArtworkGenreReferenceController {
  constructor(private genreService: ArtworkGenreReferenceService) {}

  @Get('options')
  getAllGenresAsOptions(@Query() query: ReferenceQuery<ArtworkGenre>): Promise<Option[]> {
    return this.genreService.getAllAsOptions(query);
  }

  @Get()
  getAllGenres(@Query() query: ReferenceQuery<ArtworkGenre>): Promise<ListResponse<ReferenceEntity>> {
    return this.genreService.getAllAsItems(query);
  }

  @Get(':id')
  getGenreById(@Param('id') genreId: number): Promise<ReferenceEntity> {
    return this.genreService.getItem(genreId);
  }

  @Post()
  addGenre(@Body() genre: ReferenceEntity): Promise<ArtworkGenre> {
    return this.genreService.addItem(genre);
  }

  @Put(':id')
  updateGenre(@Param('id') genreId: number, @Body() genre: ReferenceEntity): Promise<UpdateResult> {
    return this.genreService.updateItem(genreId, genre);
  }

  @Delete(':id')
  deleteGenre(@Param('id') genreId: number): Promise<DeleteResult> {
    return this.genreService.deleteItem(genreId);
  }
}
