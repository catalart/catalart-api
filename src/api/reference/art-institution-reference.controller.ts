import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtInstitutionReferenceService } from '@business/services/reference/art-institution-reference.service';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';

@Controller('reference/artInstitution')
export class ArtInstitutionReferenceController {
  constructor(private artInstitutionService: ArtInstitutionReferenceService) {}

  @Get()
  getAllArtMovements(@Query() query: ReferenceQuery<ArtInstitution>): Promise<Option[]> {
    return this.artInstitutionService.getAllAsOptions(query);
  }
}
