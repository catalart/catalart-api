import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { Artwork } from '@dal/entity/artwork.entity';
import { ArtworkQuery } from '@api/queries/artwork.query';
import { BaseRepository } from './base.repository';

@EntityRepository(Artwork)
export class ArtworkRepository extends BaseRepository<Artwork> {
  search(query: ArtworkQuery, options?: FindManyOptions<Artwork>): Promise<Artwork[]> {
    query = Object.assign(new ArtworkQuery(), query);
    return super.search(query, options);
  }
}
