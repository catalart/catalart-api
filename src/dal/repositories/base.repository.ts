import { Repository, FindManyOptions } from 'typeorm';
import { ApiQuery } from '@api/queries/api.query';

export class BaseRepository<T> extends Repository<T> {
  search(query: ApiQuery<T>, options?: FindManyOptions<T>): Promise<T[]> {
    return super.find({
      relations: !!options ? options.relations : [],
      cache: !!options ? options.cache : null,
      join: !!options ? options.join : null,
      loadEagerRelations: !!options ? options.loadEagerRelations : null,
      loadRelationIds: !!options ? options.loadRelationIds : null,
      lock: !!options ? options.lock : null,
      order: !!options ? options.order : null,
      select: !!options ? options.select : null,
      take: query.limit,
      skip: query.offset,
      where: query.determineQueryFilters()
    });
  }
}
