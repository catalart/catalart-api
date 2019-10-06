import { ApiQuery } from './api.query';
import { Artist } from '@dal/entity/artist.entity';
import { FindConditions } from 'typeorm';

export class ArtistQuery extends ApiQuery<Artist> {
  determineQueryFilters(): FindConditions<Artist> {
    const query: any = {};

    return query;
  }
}
