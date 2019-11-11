import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';

@EntityRepository(ArtMovement)
export class ArtMovementRepository extends BaseRepository<ArtMovement> {
  search(query: ApiQuery<ArtMovement>, options?: FindManyOptions<ArtMovement>): Promise<ArtMovement[]> {
    query = Object.assign(new ReferenceQuery<ArtMovement>(), query);
    return super.searchWithFilter(ArtMovement, query, options);
  }
}
