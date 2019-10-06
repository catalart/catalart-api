import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ArtCollection } from '@dal/entity/art-collection.entity';
import { ArtCollectionQuery } from '@api/queries/art-collection.query';

@EntityRepository(ArtCollection)
export class ArtCollectionRepository extends BaseRepository<ArtCollection> {
  search(query: ArtCollectionQuery, options?: FindManyOptions<ArtCollection>): Promise<ArtCollection[]> {
    query = Object.assign(new ArtCollectionQuery(), query);
    return super.search(query, options);
  }
}
