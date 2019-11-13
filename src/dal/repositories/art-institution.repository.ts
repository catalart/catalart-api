import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';

@EntityRepository(ArtInstitution)
export class ArtInstitutionRepository extends BaseRepository<ArtInstitution> {
  search(query: ApiQuery<ArtInstitution>, options?: FindManyOptions<ArtInstitution>): Promise<ArtInstitution[]> {
    query = Object.assign(new ReferenceQuery<ArtInstitution>(), query);
    return super.searchWithFilter(ArtInstitution, query, options);
  }
}
