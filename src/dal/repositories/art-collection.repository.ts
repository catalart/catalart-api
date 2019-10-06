import { EntityRepository, FindManyOptions, FindConditions, Like } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ArtCollection } from '@dal/entity/art-collection.entity';
import { ArtCollectionQuery } from '@api/queries/art-collection.query';
import { Artist } from '@dal/entity/artist.entity';

@EntityRepository(ArtCollection)
export class ArtCollectionRepository extends BaseRepository<ArtCollection> {
  search(query: ArtCollectionQuery, options?: FindManyOptions<ArtCollection>): Promise<ArtCollection[]> {
    query = Object.assign(new ArtCollectionQuery(), query);
    return super.searchWithFilter(ArtCollection, query, options);
  }

  determineSearchFilter(filter: string): Array<FindConditions<ArtCollection>> {
    return [
      {
        name: Like(`%${filter}%`)
      }
    ];
  }
}
