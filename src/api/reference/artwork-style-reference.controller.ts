import { Controller, Get, Query, Param, Post, Put, Body, Delete } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtworkStyle } from '@dal/entity/reference/artwork-style.entity';
import { ArtworkStyleReferenceService } from '@business/services/reference/artwork-style-reference.service';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { ListResponse } from '@business/models/list-response.model';

@Controller('reference/styles')
export class ArtworkStyleReferenceController {
  constructor(private styleService: ArtworkStyleReferenceService) {}

  @Get('options')
  getAllStylesAsOptions(@Query() query: ReferenceQuery<ArtworkStyle>): Promise<Option[]> {
    return this.styleService.getAllAsOptions(query);
  }

  @Get()
  getAllStyles(@Query() query: ReferenceQuery<ArtworkStyle>): Promise<ListResponse<ReferenceEntity>> {
    return this.styleService.getAllAsItems(query);
  }

  @Get(':id')
  getStyleById(@Param('id') styleId: number): Promise<ReferenceEntity> {
    return this.styleService.getItem(styleId);
  }

  @Post()
  addStyle(@Body() style: ReferenceEntity): Promise<ArtworkStyle> {
    return this.styleService.addItem(style);
  }

  @Put(':id')
  updateStyle(@Param('id') styleId: number, @Body() style: ReferenceEntity): Promise<ArtworkStyle> {
    return this.styleService.updateItem(styleId, style);
  }

  @Delete(':id')
  deleteStyle(@Param('id') styleId: number): Promise<ArtworkStyle[]> {
    return this.styleService.deleteItem(styleId);
  }
}
