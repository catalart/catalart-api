import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { Artist } from '@dal/entity/artist.entity';
import { ArtistQuery } from '@api/queries/artist.query';
import { BaseRepository } from './base.repository';

@EntityRepository(Artist)
export class ArtistRepository extends BaseRepository<Artist> {
  search(query: ArtistQuery, options?: FindManyOptions<Artist>): Promise<Artist[]> {
    query = Object.assign(new ArtistQuery(), query);
    return super.search(query, options);
  }
}
