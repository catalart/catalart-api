import { ApiQuery } from './api.query';
import { FindConditions } from 'typeorm';
import { ArtCollection } from '@dal/entity/art-collection.entity';

export class ArtCollectionQuery extends ApiQuery<ArtCollection> {
  determineQueryFilters(): FindConditions<ArtCollection> {
    const query: any = {};

    return query;
  }
}
