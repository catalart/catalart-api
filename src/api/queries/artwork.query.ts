import { ApiQuery } from './api.query';
import { FindConditions } from 'typeorm';
import { Artwork } from '@dal/entity/artwork.entity';

export class ArtworkQuery extends ApiQuery<Artwork> {
  artistId?: number;

  determineQueryFilters(): FindConditions<Artwork> {
    const query: any = {};
    if (!!this.artistId) {
      query.creator = {
        id: this.artistId
      };
    }

    return query;
  }
}
