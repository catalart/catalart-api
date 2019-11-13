import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';
import { ArtMovementReferenceService } from '@business/services/reference/art-movement-reference.service';

@Controller('reference/artMovement')
export class ArtMovementReferenceController {
  constructor(private artMovementService: ArtMovementReferenceService) {}

  @Get()
  getAllArtMovements(@Query() query: ReferenceQuery<ArtMovement>): Promise<Option[]> {
    return this.artMovementService.getAll(query);
  }
}
