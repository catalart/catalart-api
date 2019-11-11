import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ArtInstitutionRepository } from '@dal/repositories/art-institution.repository';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';

@Injectable()
export class ArtInstitutionService {
  constructor(
    @InjectRepository(ArtInstitution)
    private readonly artInstitutionRepository: ArtInstitutionRepository
  ) {}

  findInstitutionsByIds(institutions: Option[]): Promise<ArtInstitution[]> {
    return this.artInstitutionRepository.findByIds(institutions.map(i => i.id));
  }
}
