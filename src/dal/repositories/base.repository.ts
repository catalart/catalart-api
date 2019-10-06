import { Repository, FindManyOptions, Like, FindConditions, FindOperator } from 'typeorm';
import { ApiQuery } from '@api/queries/api.query';
import 'reflect-metadata';
import { queryableUsingClass } from '@dal/decorators/queryable.decorator';

export abstract class BaseRepository<T> extends Repository<T> {
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
      const properties = this.getAllPropertiesofObject(type);
      const filterableProperties = properties.filter(property => queryableUsingClass(type, property));
      const queryFilter: Array<FindConditions<T>> = [queryLevelFilter];
      const searchFilter: Array<FindConditions<T>> = [...this.determineSearchFilter(query.filter)];

      return [...searchFilter];
    } else {
      return [queryLevelFilter];
    }
  }

  private getAllPropertiesofObject(type: new () => T): Array<keyof T> {
    return Object.getOwnPropertyNames(type) as Array<keyof T>;
  }

  abstract determineSearchFilter(filter: string): Array<FindConditions<T>>;
}
