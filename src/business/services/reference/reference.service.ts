import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ListResponse } from '@business/models/list-response.model';

export interface ReferenceService<T> {
  getAllAsOptions(query: ApiQuery<T>): Promise<Option[]>;
  getAllAsItems(query: ApiQuery<T>): Promise<ListResponse<ReferenceEntity>>;
  addItem(item: T): Promise<T>;
  updateItem(itemId: number, item: T): Promise<T>;
  deleteItem(itemId: number): Promise<T[]>;
  getItem(itemId: number): Promise<T>;
}
