import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ClassificationTerm } from '@dal/entity/reference/classification-term.entity';
import { ApiQuery } from '@api/queries/api.query';
import { ClassificationTermRepository } from '@dal/repositories/classification-term.repository';
import { ReferenceMappingService } from '../maps/reference-mapping.service';

@Injectable()
export class ClassificationTermService {
  constructor(
    @InjectRepository(ClassificationTerm)
    private readonly classificationTermRepository: ClassificationTermRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAll(query: ApiQuery<ClassificationTerm>): Promise<Option[]> {
    const allTerms = await this.classificationTermRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }
}
