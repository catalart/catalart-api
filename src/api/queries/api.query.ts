import { FindConditions } from 'typeorm';

export abstract class ApiQuery<T> {
  limit?: number;
  offset?: number;
  filter?: string;

  abstract determineQueryFilters(): FindConditions<T>;
}
