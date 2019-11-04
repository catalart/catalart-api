import { Controller, Get, Query } from '@nestjs/common';

import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ClassificationTerm } from '@dal/entity/reference/classification-term.entity';
import { ClassificationTermService } from '@business/services/reference/classification-term.service';

@Controller('reference/classificationTerm')
export class ClassificationTermReferenceController {
  constructor(private classificationTermService: ClassificationTermService) {}

  @Get()
  getAllClassificationTerms(@Query() query: ApiQuery<ClassificationTerm>): Promise<Option[]> {
    return this.classificationTermService.getAll(query);
  }
}
