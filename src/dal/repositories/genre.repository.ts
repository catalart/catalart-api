import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Genre } from '@dal/entity/reference/genre.entity';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceQuery } from '@api/queries/reference.query';

@EntityRepository(Genre)
export class GenreRepository extends BaseRepository<Genre> {
  search(query: ApiQuery<Genre>, options?: FindManyOptions<Genre>): Promise<Genre[]> {
    query = Object.assign(new ReferenceQuery<Genre>(), query);
    return super.searchWithFilter(Genre, query, options);
  }
}
