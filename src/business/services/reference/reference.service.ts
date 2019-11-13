import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';

export interface ReferenceService<T> {
  getAll(query: ApiQuery<T>): Promise<Option[]>;
}
