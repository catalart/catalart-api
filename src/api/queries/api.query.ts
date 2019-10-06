import { FindConditions } from 'typeorm';

export abstract class ApiQuery<T> {
  limit?: number;
  offset?: number;

  abstract determineQueryFilters(): FindConditions<T>;
}
