import { Repository, FindManyOptions, Like, FindConditions } from 'typeorm';
import { ApiQuery } from '@api/queries/api.query';
import { determineAllQueryableFields } from '@dal/decorators/queryable.decorator';
import 'reflect-metadata';

export class BaseRepository<T> extends Repository<T> {
  searchWithFilter(type: new () => T, query: ApiQuery<T>, options?: FindManyOptions<T>): Promise<T[]> {
    const filter = this.determineFilter(type, query);
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
      where: filter
    });
  }

  determineFilter(type: new () => T, query: ApiQuery<T>): Array<FindConditions<T>> {
    const queryLevelFilter = query.determineQueryFilters();

    if (!!query.filter) {
      // How to get properties on a class?
      const queryableProperties = determineAllQueryableFields(type) as Array<keyof T>;
      const queryFilter: Array<FindConditions<T>> = [queryLevelFilter];
      const searchFilter: Array<FindConditions<T>> = this.getQueryFilter(queryableProperties, query.filter);

      return [...queryFilter, ...searchFilter].filter(this.isDefinedFindCondition);
    } else {
      return [queryLevelFilter].filter(this.isDefinedFindCondition);
    }
  }

  private getQueryFilter(properties: Array<keyof T>, filter: string): Array<FindConditions<T>> {
    return properties.map(property => {
      const filterCondition = {
        [property]: Like(`%${filter}%`)
      } as unknown;
      return filterCondition as FindConditions<T>;
    });
  }

  private isDefinedFindCondition(findCondition: FindConditions<T>): boolean {
    return !!findCondition && Object.keys(findCondition).length > 0;
  }
}
