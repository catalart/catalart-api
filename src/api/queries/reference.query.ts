import { ApiQuery } from './api.query';
import { FindConditions } from 'typeorm';

export class ReferenceQuery<T> extends ApiQuery<T> {
  determineQueryFilters(): FindConditions<T> {
    const query: any = {};

    return query;
  }
}
