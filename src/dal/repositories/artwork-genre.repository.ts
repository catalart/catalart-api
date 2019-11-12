import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ArtworkGenre } from '@dal/entity/reference/artwork-genre.entity';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceQuery } from '@api/queries/reference.query';

@EntityRepository(ArtworkGenre)
export class ArtworkGenreRepository extends BaseRepository<ArtworkGenre> {
  search(query: ApiQuery<ArtworkGenre>, options?: FindManyOptions<ArtworkGenre>): Promise<ArtworkGenre[]> {
    query = Object.assign(new ReferenceQuery<ArtworkGenre>(), query);
    return super.searchWithFilter(ArtworkGenre, query, options);
  }
}
