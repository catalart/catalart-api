import { EntityRepository, FindManyOptions, FindConditions, Like } from 'typeorm';
import { Artist } from '@dal/entity/artist.entity';
import { ArtistQuery } from '@api/queries/artist.query';
import { BaseRepository } from './base.repository';

@EntityRepository(Artist)
export class ArtistRepository extends BaseRepository<Artist> {
  search(query: ArtistQuery, options?: FindManyOptions<Artist>): Promise<Artist[]> {
    query = Object.assign(new ArtistQuery(), query);
    return super.searchWithFilter(Artist, query, options);
  }

  determineSearchFilter(filter: string): Array<FindConditions<Artist>> {
    return [
      {
        name: Like(`%${filter}%`)
      }
    ];
  }
}
